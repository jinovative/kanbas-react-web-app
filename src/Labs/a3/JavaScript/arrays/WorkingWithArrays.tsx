function WorkingWithArrays() {
    var functionScoped = 2;
    let blockScoped = 5;
    const constant1 = functionScoped - blockScoped; // This will be -3
    let numberArray1 = [1, 2, 3, 4, 5];
    let stringArray1 = ['string1', 'string2'];

    let variableArray1String = `${functionScoped}${blockScoped}${constant1}${numberArray1.join('')}${stringArray1.join('')}`;

    return (
        <>
            <h2>Working with Arrays</h2>
            numberArray1 = {numberArray1.join('')}
            <br />
            stringArray1 = {stringArray1.join('')}
            <br />
            variableArray1 = {variableArray1String}
        </>
    );
}

export default WorkingWithArrays;
