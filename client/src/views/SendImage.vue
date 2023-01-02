<template>
     <form ref="form" @submit.prevent="submit" class="upload-form">
    <label for="file-input" class="upload-label">
      Choose a file
      <input type="file" ref="fileInput" id="file-input" class="upload-input" />
    </label>
    <button type="submit" class="upload-button">Upload</button>
  </form>
  </template>
  
  <script>
  export default {
    methods: {
      async submit() {
        const fileInput = this.$refs.fileInput;
        const formData = new FormData();
        
        formData.append('image', fileInput.files[0]);
        
        try {
          const response = await fetch('http://localhost:3000/upload-image', {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  <style>
  .upload-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .upload-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .upload-input {
    display: none;
  }
  
  .upload-button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .upload-button:hover {
    background-color: #2980b9;
  }
  </style>