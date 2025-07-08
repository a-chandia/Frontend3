$(document).ready(function() {
    const table = $('#data-table').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        responsive: true,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'username' },
            { data: 'details' },
            { 
                data: null,
                render: function(data, type, row) {
                    return '<button class="btn btn-sm btn-info">Ver</button>';
                },
                orderable: false
            }
        ]
    });


    $('#load-data').click(function() {
        const dataType = $('#data-type').val();
        loadData(dataType, table);
    });
    
    loadData('users', table);
});

function loadData(dataType, table) {
    const apiUrl = `https://jsonplaceholder.typicode.com/${dataType}`;
    
    table.clear().draw();
    table.rows.add([{
        "id": "Cargando...",
        "name": "Por favor espere",
        "username": "",
        "details": ""
    }]).draw();
    
    // Obtener datos de la API
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const formattedData = formatData(data, dataType);
            table.clear().rows.add(formattedData).draw();
        },
        error: function(xhr, status, error) {
            table.clear().rows.add([{
                "id": "Error",
                "name": "No se pudieron cargar los datos",
                "username": error,
                "details": ""
            }]).draw();
            console.error("Error al cargar datos:", error);
        }
    });
}

function formatData(data, dataType) {
    return data.map(item => {
        let formatted = { id: item.id };
        
        switch(dataType) {
            case 'users':
                formatted.name = item.name;
                formatted.username = item.username;
                formatted.details = item.email;
                break;
                
            case 'posts':
                formatted.name = item.title;
                formatted.username = `User ID: ${item.userId}`;
                formatted.details = item.body.substring(0, 50) + '...';
                break;
                
            case 'todos':
                formatted.name = item.title;
                formatted.username = `User ID: ${item.userId}`;
                formatted.details = item.completed ? 'Completado' : 'Pendiente';
                break;
                
            case 'comments':
                formatted.name = item.name;
                formatted.username = item.email;
                formatted.details = item.body.substring(0, 50) + '...';
                break;
                
            default:
                formatted.name = JSON.stringify(item);
                formatted.username = '';
                formatted.details = '';
        }
        
        return formatted;
    });
}