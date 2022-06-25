$(function () {
  loadProducts();
  $("#products").on("click", ".btn-danger", handleDelete);
  $("#products").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addProduct);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var name = $("#updateName").val();
    var price = $("#updatePrice").val();
    var color = $("#updateDescription").val();
    var department = $("#updateDepartment").val();
    var description = $("#updateDescription").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + id,
      data: { name, price, color, department, description },
      method: "PUT",
      success: function (response) {
        console.log(response);
        loadProducts();
        $("#updateModal").modal("hide");
      },
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".product");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://usman-recipes.herokuapp.com/api/products/" + id,
    function (response) {
      $("#updateId").val(response._id);
      $("#updateName").val(response.name);
      $("#updatePrice").val(response.price);
      $("#updateColor").val(response.color);
      $("#updateDepartment").val(response.department);
      $("#updateDescription").val(response.description);
      $("#updateModal").modal("show");
    }
  );
}
function addProduct() {
  var name = $("#name").val();
  var price = $("#price").val();
  var color = $("#color").val();
  var department = $("#department").val();
  var description = $("#description").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "POST",
    data: { name, price, color, department, description },
    success: function (response) {
      console.log(response);
      $("#name").val("");
      $("#price").val("");
      $("#color").val("");
      $("#department").val("");
      $("#description").val("");
      loadProducts();
      $("#addModal").modal("hide");
    },
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".product");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function () {
      loadProducts();
    },
  });
}
function loadProducts() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    error: function (response) {
      var products = $("#products");
      products.html("An Error has occured");
    },
    success: function (response) {
      console.log(response);
      var products = $("#products");
      products.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        products.append(
          `<div class="product" data-id="${rec._id}"><h3>${rec.name}</h3><p><button class="btn btn-danger btn-sm float-right">Delete</button><button data-target="#updateModal" data-toggle="modal" class="btn btn-warning btn-sm float-right">Edit</button> ${rec.description}</p> <p>Price: &euro;${rec.price}</p></div>`
        );
      }
    },
  });
}
