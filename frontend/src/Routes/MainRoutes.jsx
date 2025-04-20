import { Route, Routes } from "react-router-dom"

export const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}