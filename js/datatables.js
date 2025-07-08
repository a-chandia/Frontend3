function initializeDataTable(table, dataType) {
    const config = {
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        }
    };

    if (dataType === 'users') {
        config.columns = [
            { title: "ID" },
            { title: "Nombre" },
            { title: "Usuario" },
            { title: "Email" },
            { title: "Sitio Web" },
            { title: "Acciones", orderable: false }
        ];
    } else if (dataType === 'posts') {
        config.columns = [
            { title: "ID" },
            { title: "Título" },
            { title: "ID Usuario" },
            { title: "Contenido" },
            { title: "Acciones", orderable: false }
        ];
    } else if (dataType === 'todos') {
        config.columns = [
            { title: "ID" },
            { title: "Título" },
            { title: "ID Usuario" },
            { title: "Estado" },
            { title: "Acciones", orderable: false }
        ];
    }

    table.DataTable(config);
}
