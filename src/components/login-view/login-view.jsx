import { useState } from "react";

export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        //This prevents the default behavior od the form which is to reload the entire page
        event.preventDefault();

        const data = {
            access: username,
            secret: password
        };

        fetch("https://codys-flix-0b23a40a1d0d.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
          .then((data) => {
            console.log("Loogin response: ", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No Such User")
            }
        })
        .catch((e) => {
            alert("Something Went Wrong");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="8"
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="8"
                    required
                />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>
    )
}