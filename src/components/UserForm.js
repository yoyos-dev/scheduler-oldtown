import { useState } from "react";
import { useForm, useController } from "react-hook-form"
import Select from "react-select";
import Calendar from 'react-calendar'; 
import GetTrainers from "./GetTrainers";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AvailableTimes from "./AvailableTimes";
import ButtonGroup from "./ButtonGroup";
import MultipleTimes from "./MultipleTimes";
import Popup from 'reactjs-popup';

const phoneRegExp = /(\d{3})-(\d{3})-(\d{4})/

const schema = yup.object({
    name: yup.string().required("Please Input Name"),
    phone: yup.string().required("Please Input A Valid Phone Number").matches(phoneRegExp, "Please Input A Valid Phone Number"),
    id: yup.string().optional(),
    trainer: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required("Please Select A Time")
});

const codeSchema = yup.object({
    code: yup.string().required("Please Input Valid Verification Code")
    .min(6, "Please Input Valid Verification Code")
    .max(6, "Please Input Valid Verification Code")
});

const UserForm = ({ user= {} }) => {
    const trainerOptions = [
        { value: "Any", label: "Any" },
    ];

    const { register, control, handleSubmit, formState } = useForm( {
        defaultValues: user, 
        resolver: yupResolver(schema) });

    const { register: registerC, setError: setErrorC, handleSubmit: handleSubmitC, formState: formStateC } = useForm( {
        resolver: yupResolver(codeSchema) });

    const { errors } = formState
    const { errors: errorsC } = formStateC

    const [date, setDate] = useState(new Date())
    const [formValues, setValues] = useState([])

    const { field: select } = useController( { name: "trainer", control });
    const { field: selectDate } = useController({ name: 'date', control, defaultValue: date.toDateString() });
    const { field: selectLabel } = useController({ name: 'trainerLabel', control, defaultValue: "Any" });
    const { field: selectTime } = useController({ name: 'time', control, defaultValue: "" });
    const { field: phone } = useController({ name: 'phone', control, defaultValue: "" });

    var trainers = GetTrainers();
    for (var i = 0; i < trainers.length; i++) {
        trainerOptions.push( { value: trainers[i][1], label: trainers[i][0]} )
    };

    const [popUp, setPopUp] = useState(false)
    const [receipt, setReceipt] = useState(false)
    const [verPhone, setVerPhone] = useState()


    const handleSelectChange = (option) => {
        select.onChange(option.value);
        selectLabel.onChange(option.label)
        selectTime.onChange("")
    };

    const handleDateChange = (dateChange) => {
        setDate(dateChange)
        selectDate.onChange(dateChange.toDateString())
        selectTime.onChange("")
    };

    const handlePhoneChange = (phoneNumber) => {
        phoneNumber.target.value = phoneNumber.target.value.trim().replace(/[^0-9]/g, "");

        if (phoneNumber.target.value.length < 7){
            phoneNumber.target.value = phoneNumber.target.value.replace(/(\d{3})(\d{1})/, "$1-$2");
        }
        if (phoneNumber.target.value.length < 11){
            phoneNumber.target.value = phoneNumber.target.value.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
        } 
        else{
            phoneNumber.target.value = phoneNumber.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }

        phone.onChange(phoneNumber.target.value);
      };

    const handleIdChange = (id) => {
        id.target.value = id.target.value.trim().replace(/[^0-9]/g, "");

        if (id.target.value.length >= 1){
            id.target.value = id.target.value.replace(/(\d{1})/, "x$1");
        }

    }

    const handleTimeChange = (time) => {
        selectTime.onChange(time)
    }

    const handleCodeChange = (code) => {
        code.target.value = code.target.value.trim().replace(/[^0-9]/g, "");
    }
    
    var timeSet = AvailableTimes(String((date.getMonth() + 1)+ "-" + date.getDate() + "-" + date.getFullYear()), selectLabel.value)
    var times = timeSet[0]

    const handleSave = (formValues) => {
        if(formValues.trainerLabel === "Any"){
            var trainer = MultipleTimes(formValues.time, timeSet[1])
            fetch('trainers.json').then(response => response.json()).then((json) => {
                for (var i = 0; i < json.length; i++) {
                    if(json[i].name === trainer){
                        formValues.trainer = json[i].number
                        formValues.trainerLabel = json[i].name
                        setValues(formValues);
                        setPopUp(true)
                        sendVerify(formValues)
                        formValues.trainerLabel = "Any"
                    }
                }
            });
        }
        else{
            setValues(formValues);
            sendVerify(formValues)
            setPopUp(true)
        }
    };

    const onReceiptClose = () => {
        window.location.reload()
    }

    const onPopupClose = () => {
        setPopUp(false)
    }

    const sendVerify = (values) => {
        var verPhone = values.phone.split("-")
        verPhone = verPhone.join("")
        verPhone = "+1" + verPhone
        setVerPhone(verPhone)
        const verify = { to: verPhone }

        fetch('/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( verify )
        });
    }

    const handleCodeValid = (code) => {
        const confirm = { to: verPhone, code: code.code }

        fetch('/api/verify-confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( confirm )
          })    
          .then(response => response.json()).then((json) => {
            if(json.status === 'approved'){
                setPopUp(false)
                setReceipt(true)
            const message = { to: formValues.trainer, body: formValues.name + " wants to do a training session with you at " + formValues.time + " on " + formValues.date + ".\nPhone Number: " + formValues.phone + "\nMember ID: " + formValues.id }
            fetch('/api/messages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify( message )
            });
            }
            else{
                setErrorC("code", { message: 'Code Entered Is Invalid' });
            }
          })
    }

    return (
        <>
        <form onSubmit={handleSubmit(handleSave)}>
            <div>
                <p>Name*</p>
                <input {...register("name")} placeholder="Name" />
                <div style={{ color: "red" }}>{errors.name?.message}</div>
            </div>

            <div>
                <p>Phone Number*</p>
                <input value={phone.value} maxLength={12} onChange={handlePhoneChange} placeholder="###-###-####" />
                <div style={{ color: "red" }}>{errors.phone?.message}</div>
            </div>

            <div>
                <p>Member ID (Optional)</p>
                <input {...register("id")} placeholder="x#######" onChange={handleIdChange} maxLength={8}/>
            </div>

            <div>
                <p>Trainer:</p>
                <Select
                    value = {trainerOptions.find(({ value }) => value === select.value)}
                    onChange = {handleSelectChange}
                    options = {trainerOptions}
                />
            </div>
            
            <br></br>
            <hr></hr>
            <br></br>
            
            <div className="calendar-container">
                <Calendar 
                    value={date}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    calendarType={"US"}
                />
            </div>

            <div className = "text-center">
                    Selected date: {date.toDateString()}
            </div>

            <div>
                <ButtonGroup
                    buttons={times}
                    onClick={handleTimeChange}
                />
                <div style={{ color: "red" }}>{errors.time?.message}</div>
            </div>

            <div>
                <button type="submit">Save</button>
            </div>
        </form>

        <Popup open={popUp} modal onClose={onPopupClose}>
            <div
                style={{
                    backgroundColor: 'white',
                }}>
                <h2>Confirm Booking:</h2>

                <p>A verification code has been sent to your phone.</p>
                <p>Please enter code and hit confirm to finalize booking:</p>

                <form onSubmit={handleSubmitC(handleCodeValid)}>
                    <input {...registerC("code")} maxLength={6} placeholder="######" onChange={handleCodeChange} ></input>
                    <div style={{ color: "red" }}>{errorsC.code?.message}</div>
                    <button type="submit">Confirm</button>
                </form>

                <h3>Please confirm booking information:</h3>
                <p> Name: {formValues.name}</p>
                <p> Phone Number: {formValues.phone}</p>
                <p> Member ID:  {formValues.id}</p>
                <p> Booking Date: {formValues.date}</p>
                <p> Trainer: {formValues.trainerLabel}</p>
            </div>
        </Popup>

        <Popup open={receipt} modal closeOnDocumentClick={false} onClose={onReceiptClose}>
            <div
                style={{
                    backgroundColor: 'white',
                }}>
                <h2>Booking Confirmed!</h2>

                <p>Thank you {formValues.name}!</p>
                <p>Your training session with {formValues.trainerLabel} has been confirmed</p>
                <p>for {formValues.date} at {formValues.time}.</p>

                <h3>Booking Receipt:</h3>

                <p> Name: {formValues.name}</p>
                <p> Phone Number: {formValues.phone}</p>
                <p> Member ID:  {formValues.id}</p>
                <p> Booking Date: {formValues.date} at {formValues.time}</p>
                <p> Trainer: {formValues.trainerLabel}</p>

                <button className="button" onClick={onReceiptClose} >close</button>
            </div>
        </Popup>
        </>
    );
};

export default UserForm;
