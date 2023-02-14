import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-datepicker/dist/react-datepicker.css";
import { flushSync } from "react-dom";

const Register = () => {
    const [user, setUser] = useState({});
    const [submitRequest, setSubmitRequest] = useState(false);
    const [noMandatory, setNoMandatory] = useState(false);
    // const handleWorkshopPopupClose = () => setWorkModelShow(false);
    const popupClose = () => setNoMandatory(false);
    const initialFormState = { ...user };
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({ defaultValues: initialFormState });

    const Logout = () => {

    }

    const onSubmit = (data) => {
        flushSync(setUser(data))
        console.log(user);
    }

    return <>
        <div className="container text-left">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-4 col-md-4 col-sm-12 col">
                    <div className="LoginSignBg">
                        <h4 className="">Candidate Registration</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="ref">HFN ID</label>
                                <input type="text" className="form-control" name="ref" id="ref" autoComplete="off"
                                    {...register("ref", {
                                        required: true,
                                        pattern: /^[a-z\d\-_\s]+$/i,
                                    })} />
                                <span className="error_validation ml-3">
                                    {errors.ref?.type === "required" && "This field is required."}
                                </span>
                                <span className="error_validation ml-3">
                                    {errors.ref?.type === "pattern" && "Please enter only alpha numeric"}
                                </span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Heartfulness Name</label>
                                <input type="text" name="name" id="name" className="form-control bg-white"
                                    {...register("name", {
                                        required: true
                                    })} />
                                <span className="error_validation ml-3">
                                    {errors.name?.type === "required" && "This field is required."}
                                </span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date_of_joining"> Date of Joining Heartfulness</label>
                                <div>
                                    <Controller control={control} name="date_of_joining" defaultValue={null}
                                        render={(props) => {
                                            return (
                                                <ReactDatePicker
                                                    {...props.field}
                                                    // readOnly="readOnly"
                                                    onChange={props.field.onChange}
                                                    selected={props.field.value}
                                                    className="date-input form-control"
                                                    yearDropdownItemNumber={100}
                                                    scrollableYearDropdown={true}
                                                    showYearDropdown
                                                    // disabled={true}
                                                    showMonthDropdown
                                                    autoComplete="off"
                                                    // maxDate={new Date()}
                                                    placeholderText="MM-DD-YYYY"
                                                />
                                            )
                                        }}
                                        rules={{ required: true }}
                                    />
                                    <span className="error_validation ml-3">
                                        {errors.date_of_joining?.type === "required" && "This field is required."}
                                    </span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control bg-white" name="email" id="email"
                                    {...register("email",
                                        {
                                            required: true,
                                            pattern: {
                                                value: /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|test|testing)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/,
                                                message: "Please enter a valid business email!",
                                            }
                                        })} />
                                <span className="error_validation -ml-3">
                                    {errors.email?.type === "required" && "This field is required."}
                                    {errors.email?.message}
                                </span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <div className="row ml-1">
                                    <div className="col-lg-4 col-md-6 col-sm-6 line-height">
                                        <div className="row">
                                            <input type="radio" className="form-control col-sm-2 ml-2" name="gender" id="gender" autoComplete="off" value="M"
                                                {...register("gender", { required: true })} />{" "}
                                            <p className="col-sm-4 pt-3 "> Male</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 line-height">
                                        <div className="row">
                                            <input type="radio" className="form-control col-sm-2 ml-2" name="gender" id="gender" value="F"
                                                {...register("gender", { required: true, })} />
                                            {" "}
                                            <p className="col-sm-2 pt-3">   Female</p>
                                        </div>

                                    </div>
                                    <span className="error_validation ml-3">
                                        {errors.gender?.type === "required" &&
                                            "This field is required."}
                                    </span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile Number</label>
                                <div className="PhoneInput">
                                    <Controller control={control} name="mobile"
                                        rules={{
                                            validate: (value) => isValidPhoneNumber(value),
                                            required: true,
                                            minLength: 8,
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <PhoneInput
                                                international
                                                value={value}
                                                onChange={onChange}
                                                autoComplete="off"
                                                id="mobile"
                                                defaultCountry="IN"
                                                className="form-control"
                                            />
                                        )}
                                    />
                                </div>
                                <span className="error_validation ml-3">
                                    {errors.mobile?.type === "required" &&
                                        "This field is required."}
                                </span>
                                <span className="error_validation ml-3">
                                    {errors.mobile?.type === "validate" &&
                                        "Please enter valid phone number."}
                                </span>
                                <span className="error_validation ml-3">
                                    {errors.mobile?.type === "maxLength" &&
                                        "Phone number max length is 13"}
                                </span>
                                <span className="error_validation ml-3">
                                    {errors.mobile?.type === "minLength" &&
                                        "Phone number min length is 8"}
                                </span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="attendedWorkshopStatus">Have you attended VOW Workshop?</label>
                                <div className="row ml-1">
                                    <div className="col-lg-4 col-md-6 col-sm-6 line-height">
                                        <div className="row">
                                            <input type="radio" className="form-control col-sm-2 ml-2" name="attendedWorkshopStatus" id="attendedWorkshopStatus" autoComplete="off"
                                                value="Y" {...register("attendedWorkshopStatus", { required: true, })}
                                            />
                                            <p className="col-sm-2 pt-3">  Yes</p>
                                        </div>

                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 line-height">
                                        <div className="row">
                                            <input type="radio" className="form-control col-sm-2 ml-2" name="attendedWorkshopStatus" id="attendedWorkshopStatus" value="N"
                                                {...register("attendedWorkshopStatus", { required: true, })}
                                            />
                                            <p className="col-sm-2 pt-3">  No</p>
                                        </div>
                                    </div>
                                </div>
                                <span className="error_validation ml-3">
                                    {errors.attendedWorkshopStatus?.type === "required" &&
                                        "This field is required."}
                                </span>
                            </div>
                            <div className="form-group pb-4">
                                <label htmlFor="workshopDate"> Date of attending VOW Workshop </label>
                                <Controller control={control} name="workshopDate" defaultValue={null}
                                    render={(props) => {
                                        return (
                                            <ReactDatePicker
                                                {...props.field}
                                                onChange={props.field.onChange}
                                                selected={props.field.value}
                                                ref={props.ref}
                                                className="date-input form-control"
                                                yearDropdownItemNumber={100}
                                                scrollableYearDropdown={true}
                                                showYearDropdown
                                                showMonthDropdown
                                                autoComplete="off"
                                                maxDate={new Date()}
                                                placeholderText="MM-DD-YYYY"
                                            />
                                        );
                                    }}
                                    rules={{ required: true }}
                                />
                                <span className="error_validation ml-3">
                                    {errors.workshopDate?.type === "required" && "This field is required."}
                                    {errors.workshopDate?.message}
                                </span>
                            </div>
                            <input type="submit" value="SUBMIT" className="btn btn-primary btn-block submit-button" />
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 col-md-4 col-sm-12">
                    <div className="shadow-lg p-5 mb-5 bg-white rounded">
                        <img src="https://cdn-web.heartfulness.org/us/wp-content/uploads/2020/09/universal-prayer-img-block-1.png"
                            alt="imgside" className="img-fluid hover" />
                    </div>
                </div>
            </div>
        </div>

    </>
}
export default Register;