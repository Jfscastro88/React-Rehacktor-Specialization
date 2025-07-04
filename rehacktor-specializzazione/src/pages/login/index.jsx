import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabase-client";
import { FormSchemaLogin, ConfirmSchemaLogin, getErrors, getFieldError} from "../../lib/validationForm"
import { Form, Input, Button } from "@heroui/react";

export function LoginPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });
    
    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchemaLogin.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
        } else {
            let { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            });
            if (error) {
                alert("Login failed.");
            } else {
                alert("Login successful.");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
    };
    
    const onBlur = (property) => () => {
        const message = getFieldError(FormSchemaLogin, property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };
    
    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    };
    
    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value
        }));
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        
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
        placeholder="user@example.com"
        isRequired
        value={formState.email}
        onChange={setField("email")}
        onBlur={onBlur("email")}
        aria-invalid={isInvalid("email")}
        isInvalid={!!formErrors.email}
        errorMessage={formErrors.email}
        />
        
        <Input
        name="password"
        label="Password"
        type="password"
        placeholder="Your secure password"
        isRequired
        value={formState.password}
        onChange={setField("password")}
        onBlur={onBlur("password")}
        aria-invalid={isInvalid("password")}
        isInvalid={!!formErrors.password}
        errorMessage={formErrors.password}
        />
        
        <Button type="submit" variant="primary" className="w-full">
        Login
        </Button>
        </Form>
        </div>
    );
}
