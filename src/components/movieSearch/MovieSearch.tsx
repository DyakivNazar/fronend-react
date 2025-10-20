import {useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import "./search.css"

type FormValues = {
    query: string;
};

export const MovieSearch = () => {
    const [searchM] = useSearchParams({query: ""});
    const query = searchM.get("query") || "";
    const navigate = useNavigate();

    const {register, handleSubmit, reset} = useForm<FormValues>({
        defaultValues: {query},
    });

    const onSubmit = (data: FormValues) => {
        const trimmed = data.query.trim();
        if (!trimmed) {
            navigate("/");
            reset();
            return;
        }
        navigate(`/?query=${encodeURIComponent(trimmed)}`);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"search-form"}>
            <input
                {...register("query")}
                type={"text"}
                placeholder={"Search movies..."}
                className={"search-input"}
                onBlur={() => reset({query: ""})}
                autoComplete={"off"}/>
        </form>

    );
};
