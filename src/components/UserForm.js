import { useState } from "react";
import { useForm, useController } from "react-hook-form"
import Select from "react-select";
import Calendar from 'react-calendar'; 
import GetTrainers from "./GetTrainers";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';  

const schema = yup.object({
    name: yup.string().required(),
    phone: yup.string(),
    id: yup.string().optional(),
    trainer: yup.string().required(),
    date: yup.string().required(),
});

const UserForm = ({ onSave, user= {} }) => {
    const trainerOptions = [
        { value: "Any", label: "Any" },
    ];

    const { register, control, handleSubmit, formState } = useForm( {
        defaultValues: user, 
        resolver: yupResolver(schema) });

    const { errors } = formState

    const [date] = useState(new Date())

    const { field: select } = useController( { name: "trainer", control });
    const { field: selectDate } = useController({ name: 'date', control, defaultValue: date.toDateString()});
    const { field: phone } = useController({ name: 'phone', control });

    var trainers = GetTrainers();
    for (var i = 0; i < trainers.length; i++) {
        trainerOptions.push( { value: trainers[i][1], label: trainers[i][0]} )
    };

    // const validateData = () => {
    //     let errors = {};

    //     if (!name) {
    //         errors.name = "Name is required";
    //     }

    //     if (!validator.isEmail(email)) {
    //         errors.email = "A valid email is required";
    //     }

    //     if (!validator.isMobilePhone(phone)) {
    //         errors.phone = "A valid phone number is required";
    //     }

    //     return errors;
    // };

    const handleSelectChange = (option) => {
        select.onChange(option.value);
    };

    const handleDateChange = (date) => {
        selectDate.onChange(date.toDateString())
    };

    const handlePhoneChange = (phoneNumber) => {
        var number = phoneNumber.target.value.trim().replace(/[^0-9]/g, "");

        if (number.length < 7){
            number = phoneNumber.target.value.replace(/(\d{3})(\d{1})/, "$1-$2");
        }
        if (number.length < 11){
            number = phoneNumber.target.value.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
        } 
        else{
            number = phoneNumber.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }

        phone.onChange(number);
      };

    const handleSave = (formValues) => {
        onSave(formValues);
    };

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <div>
                <p>Name*</p>
                <input {...register("name")} placeholder="Name" />
                <div style={{ color: "red" }}>{errors.name?.meesage}</div>
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
                    value = {date}
                    onChange = {handleDateChange}
                />
            </div>
            {/* <div className="text-center">
                    Selected date: {date.toDateString}
            </div> */}


            <div>
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default UserForm;