$(document).ready(function(){

  var filteredArray = [];
  orders.sort(function(a, b){
    var keyA = a.name,
        keyB = b.name;
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
  });

  // LOAD DEFAULT DATA
  for (var i = 0; i < orders.length; i++)
  {
    var name = orders[i].name;
    var lastname = orders[i].lastname;
    var country = orders[i].country;
    var ordertime = orders[i].ordertime;
    var status = orders[i].status;
    filteredArray.push(orders[i]);
    LoadOrder(i + 1, name, lastname, country, ordertime, status);
  }

  $(document).on('click', '.dropdown-menu a', function() {
    if ($(this).html() == "Paid")
    {
      $('#filter').text("Paid");
      filteredArray = [];
      for (var i = 0; i < orders.length; i++)
      {
        if (orders[i].status == "Paid")
          filteredArray.push(orders[i]);
      }
      UpdateList(filteredArray);
    }
    else if ($(this).html() == "Unpaid")
    {
      $('#filter').text("Unpaid");
      filteredArray = [];
      for (var i = 0; i < orders.length; i++)
      {
        if (orders[i].status == "Unpaid")
          filteredArray.push(orders[i]);
      }
      UpdateList(filteredArray);
    }
    else if ($(this).html() == "All")
    {
      $('#filter').text("All");
      filteredArray = [];
      for (var i = 0; i < orders.length; i++)
      {
        filteredArray.push(orders[i]);
      }
      UpdateList(filteredArray);
    }
  });


  $(document).on('click', '.dropdown-menu a', function() {
    if ($(this).html() == "By name")
    {
      $('#sort').text("By name");
      filteredArray.sort(function(a, b){
        var keyA = a.name,
            keyB = b.name;
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
      });
    }
    else if ($(this).html() == "By surname")
    {
      $('#sort').text("By surname");
      filteredArray.sort(function(a, b){
        var keyA = a.lastname,
            keyB = b.lastname;
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
      });
    }
    else if ($(this).html() == "By order time")
    {
      $('#sort').text("By order time");
      filteredArray.sort(function(a, b){
        var keyA = new Date(a.ordertime),
            keyB = new Date(b.ordertime);
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
      });
    }
    UpdateList(filteredArray);
  });

  $("#usr").change(function(){
    var searchField = $('#usr').val();
    $('tbody').html('');
    for (var i = 0; i < filteredArray.length; i++)
    {
      var expression = new RegExp(searchField, "i");
      if (filteredArray[i].name.search(expression) != -1 || filteredArray[i].lastname.search(expression) != -1 || filteredArray[i].country.search(expression) != -1) {
        var name = filteredArray[i].name;
        var lastname = filteredArray[i].lastname;
        var country = filteredArray[i].country;
        var ordertime = filteredArray[i].ordertime;
        var status = filteredArray[i].status;
        LoadOrder(i + 1, name, lastname, country, ordertime, status);
      }
    }
  });

  function UpdateList(array) {
    $('tbody').html('');
    for (var i = 0; i < filteredArray.length; i++)
    {
      var name = filteredArray[i].name;
      var lastname = filteredArray[i].lastname;
      var country = filteredArray[i].country;
      var ordertime = filteredArray[i].ordertime;
      var status = filteredArray[i].status;

      LoadOrder(i + 1, name, lastname, country, ordertime, status);
    }
  }

  function LoadOrder(i, name, lastname, country, ordertime, status) {
    $("tbody").append('<tr></tr>');
    $("tr:last").append('<td>' + i + '</td>');
    $("tr:last").append('<td>' + name + '</td>');
    $("tr:last").append('<td>' + lastname + '</td>');
    $("tr:last").append('<td>' + country + '</td>');
    $("tr:last").append('<td>' + ordertime + '</td>');
    $("tr:last").append('<td>' + status + '</td>');
  }
});
