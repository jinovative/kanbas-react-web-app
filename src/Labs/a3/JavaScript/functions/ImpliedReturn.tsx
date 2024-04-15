function ImpliedReturn() {
    const multiply = (a: number, b: number) => a * b;
    const fourTimesFive = multiply(4, 5);

    return (
        <>
            <h2>Implied Return</h2>
            fourTimesFive = {fourTimesFive}
            <br />
            multiply(4,5) = {multiply(4, 5)}
        </>
    );
}

export default ImpliedReturn;
