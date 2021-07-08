function refreshElement(view, dest, data)
{
    if (view===undefined)
    {
        if (spa_context.current_request==undefined)
            view=spa_context.START_MODULE;
        else
            view=spa_context.current_request.view;
    }

    if (dest===undefined)
    {
        if (spa_context.current_request==undefined)
            dest="body"
        else
            dest=spa_context.current_request.element_id;
    }
        

    if (spa_context.current_request===undefined)
        spa_context.current_request={};
    
    if (spa_context.current_request===null)
        spa_context.current_request={};

    if (data===undefined)
        data={};
    
    if (data===null)
        data={};
    
    spa_context.current_request.element_id=dest;
    spa_context.current_request.view=view;
    spa_context.current_request.data=data;

    $(dest).html("<div class=\'spinner-grow text-success\' role=\'status\'></div>");

    $.ajax({
    type: "POST",
    url: view,
    contentType:"text/plain",
    data: JSON.stringify(spa_context),
    success: function(data){
        $(dest).html(data);
    },
    error: function(err)
    {
        $(dest).html("<div><small>Ha ocurrido un error</small></div>");
    },
    dataType: "html"
    });

}