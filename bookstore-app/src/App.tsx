import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import Customer from "./components/customer";
import NotFound from "./components/NotFound";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<BookForm />} />
          <Route path="customers" element={<Customer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
