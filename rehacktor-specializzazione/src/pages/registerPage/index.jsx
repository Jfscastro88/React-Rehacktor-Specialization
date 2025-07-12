import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabase-client";
import { ConfirmSchema, getErrors, getFieldError } from "../../lib/validationForm";
import { Form, Input, Button } from "@heroui/react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",  
    })
    
    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
        } else {
            let { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.username
                    }
                }
            });
            if (error) {
                alert("Signing up error 👎🏻!");
            } else {
                alert("Signed up 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
    };
    const onBlur = (property) => () => {
        const message = getFieldError (property, formState[property]);
        setFormErrors((prev) => ({...prev, [property]: message }));
        setTouchedFields((prev) => ({...prev, [property]: true }));
    };
    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    }
    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value,
        }));
    };
    return (
        <div className="max-w-md mx-auto mt-25 p-6 bg-white shadow-xl rounded-xl space-y-6">
            <h2 className="text-3xl font-bold text-center">Register</h2>
        <Form
        onSubmit={onSubmit}
        validationBehavior="aria"            
        validationErrors={formErrors}         
        className="space-y-4"
        >
        <Input
        name="email"
        label="Email"
        type="email"
        placeholder="user.name@example.com"
        isRequired Required
        value={formState.email}
        onChange={setField("email")}
        onBlur={onBlur("email")} 
        aria-invalid={isInvalid("email")} 
        isInvalid={!!formErrors.email}
        errorMessage={formErrors.email}
        />
        
        <Input
        name="firstName"
        label="First Name"
        isRequired Required
        value={formState.firstName}
        onChange={setField("firstName")}
        onBlur={onBlur("firstName")} 
        aria-invalid={isInvalid("firstName")} 
        isInvalid={!!formErrors.firstName}
        errorMessage={formErrors.firstName}
        />
        
        <Input
        name="lastName"
        label="Last Name"
        isRequired Required
        value={formState.lastName}
        onChange={setField("lastName")}
        onBlur={onBlur("lastName")} 
        aria-invalid={isInvalid("lastName")} 
        isInvalid={!!formErrors.lastName}
        errorMessage={formErrors.lastName}
        />
        
        <Input
        name="username"
        label="Username"
        isRequired Required
        minLength={3}
        value={formState.username}
        onChange={setField("username")}
        onBlur={onBlur("username")}
        aria-invalid={isInvalid("username")}
        isInvalid={!!formErrors.username}
        errorMessage={formErrors.username}
        />
        
        <Input
        name="password"
        label="Password"
        type="password"
        isRequired
        minLength={8}
        placeholder="At least 8 characters"
        value={formState.password}
        onChange={setField("password")}
        onBlur={onBlur("password")}
        aria-invalid={isInvalid("password")}
        isInvalid={!!formErrors.password}
        errorMessage={formErrors.password}
        />
        
        <Button type="submit" variant="shadow" className="w-full">Register</Button>
        </Form>
        <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
            Log in
        </Link>
        </p>
        </div>
    );
};