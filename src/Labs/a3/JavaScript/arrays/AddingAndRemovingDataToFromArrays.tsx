function AddingAndRemovingDataToFromArrays() {
    let numberArray1 = [1, 2, 3, 4, 5];
    let stringArray1 = ['string1', 'string2'];

    numberArray1.push(6);
    stringArray1.push('string3');
    numberArray1.splice(2, 1);
    stringArray1.splice(1, 1);

    return (
        <>
            <h2>Add and Remove Data to/from Arrays</h2>
            numberArray1 = {numberArray1.map((num) => num)} <br />
            stringArray1 = {stringArray1.map((str) => str)}
        </>
    );
}

export default AddingAndRemovingDataToFromArrays;
