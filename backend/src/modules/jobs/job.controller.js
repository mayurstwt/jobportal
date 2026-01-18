const Job = require("./job.model");


exports.createJob = async (req,res,next) => {
    try {
        const job = await Job.create({
            ...req.body,
            recruiterId: req.user.id
        });

        res.status(201).json({ job });
    } catch (error) {
        next(error);
    }
}


exports.getJobs = async (req,res,next) => {
    try {
        const {keyword , location , skills, minSalary, maxSalary, page=1, limit=10} = req.query;

        const match = {status: 'open'};

        if(location){
            match.location = location;
        }

        if(skills){
            match.skills = {$in: skills.split(",")};
        }

        if(minSalary || maxSalary){
            match.$and = [];
            if(minSalary){
                match.$and.push({salaryMin: {$gte: Number(minSalary)}});
            }
            if(maxSalary){
                match.$and.push({salaryMax: {$lte: Number(maxSalary)}});
            }
        }

        const pipeline = [];

        if(keyword){
            pipeline.push({
                $match: {
                    $text: {$search : keyword}
                }
            });
        };

        pipeline.push(
            { $match: match },
            {$sort: {createdAt: -1}},
            {$skip: (page-1)*limit},
            {$limit: Number(limit)}
        )

        const jobs = await Job.aggregate(pipeline);

        res.json({
            page: Number(page),
            count: jobs.length,
            jobs
        })

    } catch (error)
     {
        next(error);
    }
}



exports.closeJob = async (req,res,next) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            recruiterId: req.user.id
        });

        if(!job){
            return res.status(404).json({message: "Job not found"});
        }
        
        job.status = "closed";
        await job.save();

        res.status(200).json({message: "Job closed successfully"});

    } catch (error) {
        next(error);
    }
}


