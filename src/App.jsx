import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ReactSpeedometer from "react-d3-speedometer"
import TextField from '@mui/material/TextField';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(0);
  const [text, setText] = useState('');
  const [IsHeight,setIsHeight]=useState(true)
  const [IsWeight,setIsWeight]=useState(true)
  const [color, setColor] = useState('white');

  const validate = (e) => {
    const name=e.target.name
  const value=e.target.value

    if (!!value.match(/^[0-9]*$/)) {
      if (name == 'height') {
        setHeight(value);
        setIsHeight(true)
      } else if (name == 'weight') {
        setWeight(value);
        setIsWeight(true)
      }
    }
    else{
      if (name == 'height') {
        setHeight(value);
        setIsHeight(false)
      } else if (name == 'weight') {
        setWeight(value);
        setIsWeight(false)
      }
    }
  };

  const calculate = (e) => {
    e.preventDefault();
    if (height === "" || weight === "") {
      alert("Please fill the form completely");
    } else {
      const heightInMeters = height / 100;
      const bmiValue = Math.floor(weight / (heightInMeters * heightInMeters));
      setBmi(bmiValue);
      changeColor(bmiValue);
      setBmiText(bmiValue);
    }
  };

  const changeColor = (bmi) => {
    if (bmi <= 18.5) {
      setColor('lightblue');
    } else if (bmi > 18.5 && bmi <= 25) {
      setColor('green');
    } else if (bmi > 25 && bmi < 30) {
      setColor('yellow');
    } else {
      setColor('orange');
    }
  };

  const setBmiText = (bmi) => {
    if (bmi <= 18.5) {
      setText('You are underweight. Try adding more nutrient-rich foods to your diet and consult with a healthcare provider for personalized advice.');
    } else if (bmi > 18.5 && bmi <= 25) {
      setText(' woohoo! You have a healthy weight. Maintain your current lifestyle and balanced diet to stay healthy.');
    } else if (bmi > 25 && bmi < 30) {
      setText('You are overweight. Regular physical exercise and a balanced diet can help manage your weight. Consider consulting a healthcare provider for personalized advice.');
    }  else {
      setText('You are in the obese range. It is important to seek medical advice to manage your weight effectively through diet and exercise.');
    }
  };

  const resetForm = () => {
    setHeight('');
    setWeight('');
    setBmi(0);
    setColor('white');
    setText('');
    setIsHeight(true)
    setIsWeight(true)
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '20px' }}>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 justify-content-center align-items-center p-5">
          <h3 className="text-center mt-3 text-light">BMI Calculator</h3>
          <p className="text-center m-4 text-light">
            BMI (body mass index) is a measure for adults to check what category their height and weight puts them in - underweight, healthy, or overweight.
          </p>
          <p className="text-center m-4 p-md-1 text-light">
            The calculator will give you an idea of how your weight compares to common values. Body Mass Index (BMI) is calculated as your weight divided by the square of your height or BMI = weight/height2.
          </p>

          <div style={{ height: '600px', width: "100%", backgroundColor: color }} className="shadow rounded d-flex justify-content-center align-items-center flex-column mt-5 p-4">
            <h4 className="p-2 mt-md-5" style={{ color: "black" }}>BMI Result: {bmi}</h4>
            <p className='fw-bold mt-5 p-md-2'>{text}</p>
            <ReactSpeedometer
              width={295}
              needleHeightRatio={0.60}
              value={bmi}
              segments={4}
              customSegmentStops={[0, 18, 25, 30, 45]}
              segmentColors={['#1D91F1', '#38DF17', '#EBF11D', '#F1671D']}
              minValue={0}
              maxValue={45}
              currentValueText="BMI"
              customSegmentLabels={[
                { text: "Underweight", position: "INSIDE", color: "#555" },
                { text: "Healthy", position: "INSIDE", color: "#555" },
                { text: "Over", position: "INSIDE", color: "#555" },
                { text: "Obesity", position: "INSIDE", color: "#555" },
              ]}
              ringWidth={47}
              needleTransitionDuration={3333}
              needleTransition="easeElastic"
              needleColor={"black"}
              textColor={"#d8dee9"}
            />
           
          </div>

          <div style={{ width: "100%", backgroundColor: 'white' }} className="shadow p-md-3 rounded mt-4">
            <form className="mt-4 p-5" onSubmit={calculate}>
              <div className="mb-3">
              <TextField id="filled-basic" label="Height(cm)" variant="filled" className="w-100" onChange={(e)=>validate(e)} name="height" value={height||""} />
                {!IsHeight &&
                    <p className='text-danger fw-bold'>**Invalid Input</p>
                    }
              </div>
              <div className="mb-3">
                <TextField id="filled-basic" label="Weight(kg)" variant="filled" className="w-100" onChange={(e)=>validate(e)} name="weight" value={weight||""} />
                {!IsWeight &&
                    <p className='text-danger fw-bold'>**Invalid Input</p>
                    }
              </div>
              <div className="justify-content-between d-flex mt-3">
                <Button variant="contained" type="submit" className="me-3" style={{ width: '150px', padding: '15px' }} disabled={IsHeight && IsWeight? false:true} color='success'>Submit</Button>
                <Button variant="outlined" type="button" style={{ width: '150px', padding: '15px' }} onClick={resetForm} color='error'>Reset</Button>
              </div>
            </form>

            <img className="mt-2" src="https://www.fitterfly.com/blog/wp-content/uploads/2023/02/Understanding-Your-BMI-A-Guide-to-Reading-a-BMI-Chart.jpg" alt="" width="100%" />
          </div>

          <p className="text-center m-4 text-light">
            This calculator should only be used by adults. Pregnant or lactating women should not rely on these BMI results, and no action should be taken based on its values other than to consult a qualified person such as a doctor.
            <br />
            If you think you have an eating disorder, the BMI calculator may not be suitable for you.
          </p>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}

export default App;
