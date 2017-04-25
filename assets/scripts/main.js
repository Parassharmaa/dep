function firstload() {
	if (localStorage.getItem("username")) {
		n = caps(localStorage.getItem("username"))
		bindData(caps(n), "dep--user")
	}
	else {
		var n = prompt("Enter Username!");
		if (localStorage.getItem("tasks")) {
			localStorage.removeItem("tasks");
		}
		bindData(caps(n), "dep--user")
		localStorage.setItem("username", n);
	}

	if (localStorage.getItem("tasks")) {
		tasks_data = JSON.parse(localStorage.getItem("tasks"))
		bindJson(tasks_data, "dep--arena")
	}
}

function loadArena() {
	if (localStorage.getItem("tasks")) {
		tasks_data = JSON.parse(localStorage.getItem("tasks"))
		bindJson(tasks_data, "dep--arena")
	}

	else {
		document.getElementById("dep--arena").innerHTML = "";
	}
}

function bindData(d, id) {
	document.getElementById(id).innerHTML = d;
}

function bindJson(d, id) {
	document.getElementById(id).innerHTML = "";
	for (i=0; i<d.length;i++) {
		document.getElementById(id).innerHTML += d[i].title+"<br>"+"["+d[i].priority+"]<hr>";
	}
}

function caps(n) {
	return n.charAt(0).toUpperCase() + n.slice(1, n.length).toLowerCase()
}

function clickIt() {
	document.getElementById("dep--submit").addEventListener("click", addThings());
}

document.getElementById('dep--input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
    	addThings()
    }
})

function addThings() {
	var title = document.getElementById("dep--title").value;
	var priority  = document.getElementById("dep--priority").value;
	var task = {
		"title": title,
		"priority": priority,
	}
	if (validate(task)) {
		alert("Enter Title!!")
		return false;
	}

	if (localStorage.getItem("tasks")) {
		tasks = JSON.parse(localStorage.getItem("tasks"));
		tasks.push(task)
		localStorage.setItem("tasks", JSON.stringify(tasks))
	}

	else {
		tasks = [task];
		localStorage.setItem("tasks", JSON.stringify(tasks))
	}
	clearField()
	loadArena()
}

function clearField() {
	document.getElementById("dep--title").value = "";
}

function validate(data) {
	if (data.title) {
		return false;
	}

	return true;
}

function clearDep() {
	document.getElementById("dep--clear").addEventListener("click", function clearAll() {
		if (localStorage.getItem("tasks")) {
				localStorage.removeItem("tasks");
		}
		loadArena();
	})	
}

function logOut() {
	document.getElementById("dep--logout").addEventListener("click", function clearAll() {
		if (localStorage.getItem("tasks")) {
				localStorage.removeItem("tasks");
		}
		if (localStorage.getItem("username")) {
				localStorage.removeItem("username");
		}
		location.reload();
	})	
}
