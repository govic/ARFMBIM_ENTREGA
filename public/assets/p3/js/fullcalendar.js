var resultado = [];
getTareaRol();
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar1');
	
	

    var calendar = new FullCalendar.Calendar(calendarEl, {
      height: 'auto',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'listDay,listWeek'
      },

      // customize the button names,
      // otherwise they'd all just say "list"
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' }
      },

      initialView: 'listWeek',
      initialDate: '2022-06-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit:true, 
      dayMaxEvents: true, // allow "more" link when too many events
      events: {
       
      }
    });
    var myEvent = {
      title:"my new event",
      allDay: true,
      start: new Date('2022-06-10'),
      end: new Date('2022-06-28')
    };
	console.log("CALENDARIO OBJETO");
    console.log(calendar);
	calendar.addEventSource(resultado);
    //calendar.fullcalendar.calendar( 'renderEvent', myEvent );
    calendar.render();
  });

  //LIST FULL CALENDAR

  document.addEventListener('DOMContentLoaded', function() {
    var containerEl = document.getElementById('external-events-list');
    new FullCalendar.Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText.trim()
        }
      }
    });
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
		
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialDate: '2022-06-01',
	  navLinks: true, // can click day/week names to navigate views
	  businessHours: true, // display business hours
	  editable: true,
	  selectable: true,
	  selectMirror: true,
	  droppable: true, // this allows things to be dropped onto the calendar
	  drop: function(arg) {
		// is the "remove after drop" checkbox checked?
		if (document.getElementById('drop-remove').checked) {
		  // if so, remove the element from the "Draggable Events" list
		  arg.draggedEl.parentNode.removeChild(arg.draggedEl);
		}
	  },
	  select: function(arg) {
		var title = prompt('Nombre de Tarea:');
		if (title) {
		  calendar.addEvent({
			title: title,
			start: arg.start,
			end: arg.end,
			allDay: arg.allDay
		  })
		}
		calendar.unselect()
	  },
	  eventClick: function(arg) {
		if (confirm('88')) {
		  arg.event.remove();
		}
	  },
	  editable: true,
	  dayMaxEvents: false, // allow "more" link when too many events
	  eventSources:  function(start,end,callback) {
		var event = [];
		event.push({
			title: 'Garten',
			start: '2022-06-10T00:00:00',
			allday: true
		});
	   
		callback(event);
	  	}
	
	});



	//calendar.removeAllEvents();
	calendar.addEvent({
		title: 'ASasAS',
		start: '2020-06-24',
		end: '2020-06-24',
		allDay: true
	  })
	calendar.addEvent([{ title: 'ASasAS', start: '2020-06-24', constraint: 'availableForMeeting' }]);
    calendar.render();
	//calendar.refetchEvents();
    //calendar.fullcalendar('renderEvent',{ title: 'YOUR TITLE', start: '2020-06-24', allDay: true }, true );
  
  });

  
  function getTareaRol(){
	console.log("EVENTOS TAREA");
	console.log(resultado);
	jQuery.get({
		url: '/listaTareaRol',
		contentType: 'application/json',
		success: function (res) {
		   var cont = 1;
		   console.log("resultado");
		   console.log(res);
		   for(var i=0;i<res.length;i++){
			   cont = i+1;
			   console.log( res[i].id);
			   console.log("PASO POR UN IS");
			   var a = {title: "'"+res[i].nombre+"'", start: "'"+res[i].fecha+"'", constraint:"'"+res[i].nombre+"'"};
			   console.log(typeof a);
			  // resultado.push(a);
				//$('#tareas_rol > tbody:last-child').append('<tr><td>'+res[i].nombre+'</td><td>'+res[i].fecha+'</td><td>'+res[i].rol+'</td><td>'+res[i].descripcion+'</td><td>'+res[i].recursos+'</td><td><button class=\'btn btn-primary btn-block\'  onclick=\'deleteTareaRol('+res[i].id+')\'>ELIMINAR</button></td></tr>');
		   }
		},error:function(e){
				 console.log("error envio");
				 console.log(e);
		 }
   });
	  /**
	   * title: 'Business Lunch',
		  start: '2022-06-06T13:00:00',
		  constraint: 'businessHours'
	   * 
	   *  start: '2020-11-06',
		  end: '2020-11-08',
		  overlap: false,
		  display: 'background',
		  color: 'transparent'
	   */
		
  }