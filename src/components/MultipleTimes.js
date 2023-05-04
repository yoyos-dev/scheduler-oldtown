function MultipleTimes(time, trainers) {
    var count = 0
    var trainerList = []
    var item
    for ( const element of trainers ){
        if ( time === element[1] ){
            trainerList.push(element[0])
            count = count + 1
        }
    }
    if ( count >= 2 ){
        item = trainerList[~~(Math.random() * trainerList.length)];
    }
    else{
        item = trainerList[0]
    }

    return (
        item
    )
}

export default MultipleTimes