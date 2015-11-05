var setPopoverTemplate = function(id, creator, time, content) {
    var template = "";
    template += '<div class="simple-popover popover">';
    template += '<div class="arrow"></div>';
    template += '<div class="simple-popover-content">';
    template += '<div class="cal-event-click-popover">';
    template += '<input type="hidden" class="eventId" value="' + id + '">';
    template += '<p class="time">' + time + '</p>';
    template += '<div class="content">' + content + '</div>';
    template += '<ul class="participants"><li class="participant" title=""><a href="#"><img src="img/cloud.jpg" alt="eternaltreesnow" class="avatar"></a></li></ul>';
    template += '<div class="links"><a href="#" class="more-info">查看详情</a>';
    template += '<a href="javascript:void(0);" class="delete-link">删除</a><a href="#" class="edit-link">编辑</a></div></div></div></div>';
    return template;
}
$(function() {
    var calendar = $("#calendar");
    var template = "";
    var popover_open = false;
    // initial the fullCalendar
    calendar.fullCalendar({
        lang: 'zh-cn',
        fixedWeekCount: false,
        weekNumbers: true,
        header: {
            left: 'prevYear,prev,next,nextYear',
            center: 'title',
            right: 'today month,agendaDay'
        },
        eventLimit: true,
        events: [
            {
                id: 1,
                title: 'All Day Event',
                creator: 'dick',
                start: '2015-10-21',
                description: 'dd',
                sharedid: '1, 3, 5'
            }
        ],
        eventRender: function(event, element) {
            // initial the popover attributes of the DOM
            element.attr('data-toggle', 'popover');
            element.attr('data-content', 'temp');
            element.attr('data-container', 'body');
            template = setPopoverTemplate(event.id, event.creator, event.start, event.description);
            var options = {
                trigger: 'manual',
                template: template,
                html: true,
                placement: 'auto right'
            };
            element.popover(options).on('click', function() {
                $(this).popover('show');
            });
        },
        eventClick: function(calEvent, jsEvent, view) {
            $(".delete-link").each(function() {
                $(this).on('click', function() {
                    $("#deleteEventId").val($(this).parent().siblings('.eventId').val());
                    $("#deleteEventModal").modal('show');
                });
            });
        },
        dayClick: function(date, jsEvent, view) {
            $(jsEvent.target).bind('dblclick', function() {
                $("#addEventModal #event_start").val(date.format());
                $("#addEventModal").modal('show');
            });
            // if($(".simple-popover").length === 0) {
            // }
        }
    });
    $("#addEventBtn").on('click', function() {
        var title = $("#event_title").val();
        var description = $("#event_des").val();
        var start = $("#event_start").val();
        var new_event = {
            title: title,
            description: description,
            start: start,
            creator: 'dick',
            sharedid: ''
        };
        calendar.fullCalendar('renderEvent', new_event);
        $("#addEventModal input").val("");
        $("#addEventModal").modal('toggle');
    });
    $("#deleteEventModalBtn").on('click', function() {
        var eventId = $("#deleteEventId").val();
        $('[data-toggle="popover"]').popover('hide');
        calendar.fullCalendar('removeEvents', eventId);
        $("#deleteEventModal").modal('toggle');
    });
    $('body').on('click', function(e) {
        var isEvent = ($(e.target).data('toggle') !== 'popover') && ($(e.target).parents('[data-toggle="popover"]').length === 0);
        if(isEvent && $(e.target).parents('.popover.in').length === 0) {
            $('[data-toggle="popover"]').popover('hide');
        }
    });
});
