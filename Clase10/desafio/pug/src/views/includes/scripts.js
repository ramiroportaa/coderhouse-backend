const deleteProduct = async (id)=>{
    try{
        const res = await fetch(`/productos/${id}`, {
        method: "DELETE"
        });
    }catch (error) {
        alert("error detectado: " + error.message);
    }
    location.replace("/productos");
}

const updateProduct = async (e) => {
    e.preventDefault();
    const id = e.target.attributes["data-product-id"].value;
    try{
        const data = new FormData(e.target);
        let obj = {};
        data.forEach((value,key)=>obj[key]=value);
        const fetching = await fetch(`/productos/${id}`,{
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {"Content-Type": "application/json"}
        });
        const res = await fetching.json();
        location.reload();
    }catch(error){
        alert("error detectado: " + error.message);
    }
};

const updateForm = document.querySelector("#updateForm");
updateForm.addEventListener("submit", updateProduct);