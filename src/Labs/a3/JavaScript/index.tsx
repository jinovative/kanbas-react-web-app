// variables
import VariablesAndConstants from './variables/VariablesAndConstants';
import VariableTypes from './variables/VariableTypes';
import BooleanVariables from './variables/BooleanVariables';

// conditionals
import IfElse from './conditionals/IfElse';
import TernaryOpertor from './conditionals/TernaryOperator';

// functions
import ES5Functions from './functions/ES5Functions';
import ArrowFunctions from './functions/ArrowFunctions';
import ImpliedReturn from './functions/ImpliedReturn';
import FunctionParenthesisAndParameters from './functions/FunctionParenthesisAndParameters';

// array
import WorkingWithArrays from './arrays/WorkingWithArrays';
import ArrayIndexAndLength from './arrays/ArrayIndexAndLength';
import AddingAndRemovingDataToFromArrays from './arrays/AddingAndRemovingDataToFromArrays';
import ForLoops from './arrays/ForLoops';
import MapFunction from './arrays/MapFunction';
import FindFunction from './arrays/FindFunction';
import FilterFunction from './arrays/FilterFunction';
import FunctionDestructing from './functions/FunctionDestructing';

// json
import JsonStringify from './json/JsonStringify';
import House from './json/House';
import Spreading from './json/Spreading';
import Destructing from './json/Destructing';

//string
import TemplateLiterals from './string/TemplateLiterals';

function JavaScript() {
    console.log('Hello World!');
    return (
        <div>
            <h1>JavaScript</h1>
            {/* variables */}
            <VariablesAndConstants />
            <VariableTypes />
            <BooleanVariables />
            {/* conditionals */}
            <IfElse />
            <TernaryOpertor />
            {/* functions */}
            <ES5Functions />
            <ArrowFunctions />
            <ImpliedReturn />
            <FunctionParenthesisAndParameters />
            <FunctionDestructing />
            {/* Array */}
            <WorkingWithArrays />
            <ArrayIndexAndLength />
            <AddingAndRemovingDataToFromArrays />
            <ForLoops />
            <MapFunction />
            <FindFunction />
            <FilterFunction />
            {/* json */}
            <JsonStringify />
            <House />
            <Spreading />
            <Destructing />
            {/* string */}
            <TemplateLiterals />
        </div>
    );
}

export default JavaScript;
