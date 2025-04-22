import React, { Component } from 'react';
import { stateDistrictMap } from './stateDistrictMap';
import axios from 'axios';
import './bank.css';

const steps = [
  { title: "Personal Information", fields: ["name", "gender", "phoneNumber", "email"] },
  { title: "Date of Birth & Nationality", fields: ["dateOfBirth", "nationality"] },
  { title: "Address Details", fields: ["state", "district", "address"] },
  { title: "Identification", fields: ["aadharNumber"] },
];

class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      formData: {
        name: "", gender: "", phoneNumber: "", email: "", dateOfBirth: "",
        nationality: "Indian", state: "", district: "", address: "", aadharNumber: "",
      },
      districts: [],
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  handleStateChange = (e) => {
    const selectedState = e.target.value;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, state: selectedState, district: "" },
      districts: stateDistrictMap[selectedState] || [],
    }));
  };

  validateStep = () => {
    const { currentStep, formData } = this.state;
    const currentFields = steps[currentStep].fields;
    let stepErrors = {};

    currentFields.forEach(field => {
      if (!formData[field]) {
        stepErrors[field] = "This field is required";
      } else if (field === "phoneNumber" && !/^\d{10}$/.test(formData[field])) {
        stepErrors[field] = "Phone number must be 10 digits";
      } else if (field === "email" && !/\S+@\S+\.\S+/.test(formData[field])) {
        stepErrors[field] = "Please enter a valid email address";
      } else if (field === "aadharNumber" && !/^\d{16}$/.test(formData[field])) {
        stepErrors[field] = "Aadhar number must be 16 digits";
      }
    });

    this.setState({ errors: stepErrors });
    return Object.keys(stepErrors).length === 0;
  };

  handleNext = () => {
    if (this.validateStep()) {
      const { currentStep } = this.state;
      if (currentStep < steps.length - 1) {
        this.setState((prevState) => ({
          currentStep: prevState.currentStep + 1,
        }));
      } else {
        this.handleSubmit();
      }
    }
  };

  handlePrevious = () => {
    this.setState((prevState) => ({
      currentStep: Math.max(0, prevState.currentStep - 1),
    }));
  };

  handleSubmit = () => {
    const { formData } = this.state;
    console.log("Form submitted:", formData);
        var data = {
            name: formData.name,
            gender: formData.gender,
            phno: formData.phoneNumber,
            email: formData.email,
            dob: formData.dateOfBirth,
            nation: formData.nationality,
            state: formData.state,
            district: formData.district,
            address: formData.address,
            uid: formData.aadharNumber,
        };
        axios.post("http://localhost/digital_miniloan_backend/bank_insert.php", data).then((response) => {
            if (response.data === "success") {
                alert("saved");
            } else {
                alert(response.data);
            }
        });
    // Here you would typically send the data to your backend
  };

  renderField = (field) => {
    const { formData, errors, districts } = this.state;
    switch (field) {
      case "name":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={this.handleInputChange}
              placeholder="John Doe"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
        );
      case "gender":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={this.handleInputChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
        );
      case "phoneNumber":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={this.handleInputChange}
              placeholder="8590492836"
              maxLength="10"
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>
        );
      case "email":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={this.handleInputChange}
              placeholder="john@example.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        );
      case "dateOfBirth":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={this.handleInputChange}
            />
            {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
          </div>
        );
      case "nationality":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="nationality">Nationality</label>
            <select
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={this.handleInputChange}
            >
              <option value="Indian">Indian</option>
              <option value="Others">Others (Non-Indian)</option>
            </select>
            {errors.nationality && <span className="error">{errors.nationality}</span>}
          </div>
        );
      case "state":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="state">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={this.handleStateChange}
            >
              <option value="">Select state</option>
              {Object.keys(stateDistrictMap).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <span className="error">{errors.state}</span>}
          </div>
        );
      case "district":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="district">District</label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={this.handleInputChange}
              disabled={!formData.state}
            >
              <option value="">Select district</option>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
            {errors.district && <span className="error">{errors.district}</span>}
          </div>
        );
      case "address":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={this.handleInputChange}
              placeholder="123 Main St, City"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
        );
      case "aadharNumber":
        return (
          <div className="form-group" key={field}>
            <label htmlFor="aadharNumber">Aadhar Number</label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={this.handleInputChange}
              placeholder="1234567890123456"
            />
            {errors.aadharNumber && <span className="error">{errors.aadharNumber}</span>}
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    const { currentStep } = this.state;

    return (
      <div className="bank-registration-form">
        <h1>Create Bank Account</h1><br/><br/>
        <div className="progress-bar2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`progress-step ${index <= currentStep ? 'active' : ''}`}
            >
              <div className="step-number">{index + 1}</div><br/>
              <div className="step-title">{steps[index].title}</div>
            </div>
          ))}
        </div><br/><br/><br/>

        <form>
          {steps[currentStep].fields.map((field) => this.renderField(field))}
        </form>

        <div className="form-navigation">
          {currentStep > 0 && (
            <button type="button" onClick={this.handlePrevious}>
              Previous
            </button>
          )}
          <button type="button" onClick={this.handleNext}>
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    );
  }
}

export default Bank;
