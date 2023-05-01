function MultipleTimes(time, trainers) {
    var count = 0
    var trainerList = []
    console.log(trainers)
    for ( const element of trainers ){
        if ( time === element[1] ){
            trainerList.push(element[0])
            count = count + 1
        }
    }
    if ( count >= 2 ){
        var item = trainerList[Math.floor(Math.random()*trainerList.length)];
    }
    else{
        var item = trainerList[0]
    }

    return (
        item
    )
}

export default MultipleTimes