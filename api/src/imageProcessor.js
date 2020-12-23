const path= require('path');
const {Worker, isMainThread} = require('worker_threads');
const pathToResizeWorker= path.resolve(__dirname, 'resizeWorker.js');
const pathToMonochromeWorker= path.resolve(__dirname, 'monochromeWorker.js');

const uploadPathResolver= (filename)=>{
    return path.resolve(__dirname, '../uploads', filename);
}

const imageProcessor= (filename) => {
    return new Promise((resolve, reject)=>{
        const sourcePath=uploadPathResolver(filename);
         const resizedDestination= uploadPathResolver('resized-' + filename);
         const monochromeDestination= uploadPathResolver('monochrome-' + filename);
         const resizeWorkerFinished=false;

        if(isMainThread){
            try{
                const resizeWorker= new Worker(pathToResizeWorker, {workerData: {source: sourcePath, destination: resizedDestination}});
                // const monochromeWorker= new Worker(pathToMonochromeWorker, {workerData: {source: sourcePath, destination: monochromeDestination}});
                
                // resizeWorker.on('message', (message)=>{
                //     resizeWorkerFinished=true;
                //     resolve('resizeWorker finished processing');
                // });

            }catch(error){
                reject(error);
            }
        }else{
            reject(new Error('not on main thread'));
        }
        
    });
};


module.exports=imageProcessor;