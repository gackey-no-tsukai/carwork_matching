import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TypeSelector } from "./TypeSelector";

export function AddTask() {
    const [submitForm, setSubmitForm] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false)

    return (<>
        <div>
            <span>作業名</span>
            <input
                type="text"
                name="job_name"
                value={submitForm.name}
                onChange={setSubmitForm(value{})}
                className="bg-gray-900 text-white border border-gray-700 rounded"
              />
        </div>
    </>)
}