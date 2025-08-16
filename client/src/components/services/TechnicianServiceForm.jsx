// // src/components/services/TechnicianServiceForm.jsx
// import React, { useState, useEffect } from "react";

// export default function TechnicianServiceForm({
//   initial = {},
//   onSubmit,
//   onCancel,
// }) {
//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     description: "",
//     price: "",
//     imageFile: null,
//     previewUrl: "",
//   });

//   useEffect(() => {
//     if (initial.title) {
//       setForm({
//         title: initial.title,
//         category: initial.category || "",
//         description: initial.description || "",
//         price: initial.price || "",
//         imageFile: null,
//         previewUrl: initial.image || "",
//       });
//     }
//   }, [initial]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       const file = files[0];
//       setForm((f) => ({ ...f, imageFile: file }));
//       if (file) {
//         const url = URL.createObjectURL(file);
//         setForm((f) => ({ ...f, previewUrl: url }));
//       } else {
//         setForm((f) => ({ ...f, previewUrl: initial.image || "" }));
//       }
//     } else {
//       setForm((f) => ({ ...f, [name]: value }));
//     }
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("category", form.category);
//     fd.append("description", form.description);
//     fd.append("price", form.price);
//     if (form.imageFile) fd.append("image", form.imageFile);
//     onSubmit(fd);
//   };

//   return (
//     <div className="modal modal-open">
//       <div className="modal-box max-w-md">
//         <h3 className="font-bold text-lg mb-4">
//           {initial._id ? "Edit Service" : "Create Service"}
//         </h3>
//         <form onSubmit={submit} className="space-y-4">
//           <input
//             name="title"
//             type="text"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Title"
//             required
//             className="input input-bordered w-full"
//           />
//           <input
//             name="category"
//             type="text"
//             value={form.category}
//             onChange={handleChange}
//             placeholder="Category"
//             required
//             className="input input-bordered w-full"
//           />
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="textarea textarea-bordered w-full"
//           />
//           <input
//             name="price"
//             type="number"
//             value={form.price}
//             onChange={handleChange}
//             placeholder="Price"
//             required
//             className="input input-bordered w-full"
//           />
//           <input
//             name="image"
//             type="file"
//             accept="image/*"
//             onChange={handleChange}
//             className="file-input file-input-bordered w-full"
//           />
//           {form.previewUrl && (
//             <img
//               src={form.previewUrl}
//               alt="Preview"
//               className="mt-2 w-full h-40 object-cover rounded"
//             />
//           )}
//           <div className="modal-action">
//             <button type="submit" className="btn btn-primary">
//               {initial._id ? "Update" : "Create"}
//             </button>
//             <button
//               type="button"
//               onClick={onCancel}
//               className="btn btn-secondary"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// ______________________________________________________

// src/components/services/TechnicianServiceForm.jsx
import React, { useState, useEffect } from "react";

export default function TechnicianServiceForm({
  initial = {},
  onSubmit,
  onCancel,
  saving = false, // receive loader flag
}) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    imageFile: null,
    previewUrl: "",
  });

  useEffect(() => {
    if (initial.title) {
      setForm({
        title: initial.title,
        category: initial.category || "",
        description: initial.description || "",
        price: initial.price || "",
        imageFile: null,
        previewUrl: initial.image || "",
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((f) => ({ ...f, imageFile: file }));
      if (file) {
        const url = URL.createObjectURL(file);
        setForm((f) => ({ ...f, previewUrl: url }));
      } else {
        setForm((f) => ({ ...f, previewUrl: initial.image || "" }));
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("price", form.price);
    if (form.imageFile) fd.append("image", form.imageFile);
    onSubmit(fd);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4">
          {initial._id ? "Edit Service" : "Create Service"}
        </h3>
        <form onSubmit={submit} className="space-y-4">
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="input input-bordered w-full"
          />
          <input
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="input input-bordered w-full"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="input input-bordered w-full"
          />
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
          />
          {form.previewUrl && (
            <img
              src={form.previewUrl}
              alt="Preview"
              className="mt-2 w-full h-40 object-cover rounded"
            />
          )}
          <div className="modal-action flex gap-2">
            <button
              type="submit"
              className="btn btn-primary flex-1 flex items-center justify-center"
              disabled={saving}
            >
              {saving ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : initial._id ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary flex-1"
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
