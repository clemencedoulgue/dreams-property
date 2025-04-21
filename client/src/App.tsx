import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AddPropertyPage from './pages/AddPropertyPage';
import ErrorBoundary from './components/ErrorBoundary';
import { UserProvider } from './contexts/user-context';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    return (
        <ErrorBoundary>
            <UserProvider>
                <HashRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <div className="min-h-screen flex flex-col bg-gray-100">
                            <header className="bg-blue-600 text-white p-4 shadow-md">
                                <h1 className="text-2xl font-bold">Dreams Property</h1>
                            </header>
                            <main className="flex-grow container mx-auto px-4 py-8">
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/properties/:id" element={<PropertyDetailsPage />} />
                                    <Route path="/add-property" element={<AddPropertyPage />} />
                                </Routes>
                            </main>
                            <footer className="bg-gray-800 text-white p-4 text-center">
                                <p>© 2023 Dreams Property. All rights reserved.</p>
                            </footer>
                        </div>
                    </ThemeProvider>
                </HashRouter>
            </UserProvider>
        </ErrorBoundary>
    );
}

export default App; 