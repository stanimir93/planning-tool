import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layout.tsx";
import Project from "./project.tsx";
import Goal from "./goal.tsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={''} element={<Layout/>}>
                    <Route path={':projectName'} element={<Project/>}>
                        <Route path={':goalName'} element={<Goal/>}/>
                    </Route>
                    <Route path="*" element={<h1>Page not found</h1>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
