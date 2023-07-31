let submitForm = document.getElementById("submit");

const data = {
   name: '',
   email: '',
   phone: '',
   url: '',
   gender: '',
   skillArr: [],
}

const getData = () => {
   data.name = document.getElementById('name').value;
   data.email = document.getElementById('email').value;
   data.phone = document.getElementById('phone').value;
   data.url = document.getElementById('url').value;
   data.gender = document.querySelector('input[name="g"]:checked').value;
   let skills = document.querySelectorAll('.checkbox:checked');

   data.skillArr = [];
   skills.forEach((item) => {
      data.skillArr.push(item.value);
   })

   if (localStorage.getItem("dataSection") === null) {
      dataItem = [];
   }
   else {
      dataItem = JSON.parse(localStorage.getItem("dataSection"))
   }
   dataItem.push(data);
   localStorage.setItem("dataSection", JSON.stringify(dataItem));
}

const showData = () => {
   let detailCard = document.getElementById("detailCard");

   let cards = '';

   let getLocalStorage = localStorage.getItem("dataSection");

   if (getLocalStorage === null) {
      console.log("null");
   }
   else {
      cardDivArr = JSON.parse(getLocalStorage);

      cardDivArr.forEach((item, index) => {

         cards += `<div class="card">
            <img src=${item.url} alt="Profile Picture">
            <div class="data">
                <p><strong>Name</strong> : ${item.name}</p>
                <p><strong>Email</strong> : ${item.email}</p>
                <p><strong>Phone</strong>: ${item.phone}</p>
                <p><strong>Gender</strong> : ${item.gender}</p>
                <p><strong>Skills</strong> : ${item.skillArr.join(", ")}</p>
                <button onclick="deleteData(${index})">Delete</button>
            </div>
        </div>`;
      })
   }
   detailCard.innerHTML = cards;
}

const deleteData = (index) => {
   let getList = JSON.parse(localStorage.getItem("dataSection"));
   getList.splice(index, 1);

   localStorage.setItem("dataSection", JSON.stringify(getList));
   window.location.reload();
}
showData();
submitForm.addEventListener(('click'), () => {
   getData();
   showData();
})
