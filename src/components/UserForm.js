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

const phoneRegExp = /(\d{3})-(\d{3})-(\d{4})/

const schema = yup.object({
    name: yup.string().required("Please Input Name"),
    phone: yup.string().required("Please Input A Valid Phone Number").matches(phoneRegExp, "Please Input A Valid Phone Number"),
    id: yup.string().optional(),
    trainer: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required("Please Select A Time")
});

const UserForm = ({ onSave, user= {} }) => {
    const trainerOptions = [
        { value: "Any", label: "Any" },
    ];

    const { register, control, handleSubmit, formState } = useForm( {
        defaultValues: user, 
        resolver: yupResolver(schema) });

    const { errors } = formState

    const [date, setDate] = useState(new Date())

    const { field: select } = useController( { name: "trainer", control });
    const { field: selectDate } = useController({ name: 'date', control, defaultValue: date.toDateString() });
    const { field: selectLabel } = useController({ name: 'trainerLabel', control, defaultValue: "Any" });
    const { field: selectTime } = useController({ name: 'time', control, defaultValue: "" });
    const { field: phone } = useController({ name: 'phone', control, defaultValue: "" });

    var trainers = GetTrainers();
    for (var i = 0; i < trainers.length; i++) {
        trainerOptions.push( { value: trainers[i][1], label: trainers[i][0]} )
    };

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

    const handleTimeChange = (time) => {
        selectTime.onChange(time)
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
                        onSave(formValues);
                        formValues.trainerLabel = "Any"
                    }
                }
            });
        }
        else{
            onSave(formValues);
        }
    };

    return (
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
                <input {...register("id")} placeholder="x######" />
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
    );
};

export default UserForm;
