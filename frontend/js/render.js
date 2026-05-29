const grid =
    document.getElementById(
        'productsGrid'
    );

function obterProdutosFiltrados() {

    const busca =
        document
            .getElementById('searchInput')
            .value
            .toLowerCase();

    const filtroStatus =
        document.getElementById(
            'filterStatus'
        ).value;

    let lista = [...produtos].sort(
        (a, b) =>
            new Date(a.validade) -
            new Date(b.validade)
    );

    if (busca) {

        lista = lista.filter(p =>

            p.nome
                .toLowerCase()
                .includes(busca)

            ||

            p.local
                .toLowerCase()
                .includes(busca)

            ||

            (p.status || '')
                .toLowerCase()
                .includes(busca)

            ||

            (p.lote || '')
                .toLowerCase()
                .includes(busca)
        );
    }

    if (filtroStatus !== 'todos') {

        lista = lista.filter(p =>

            calcularStatus(
                p.validade
            ).classe === filtroStatus
        );
    }

    return lista;
}

function atualizarEstatisticas() {

    let ok = 0;
    let alert = 0;
    let danger = 0;

    produtos.forEach(p => {

        const status =
            calcularStatus(
                p.validade
            );

        if (status.classe === 'ok') ok++;

        if (status.classe === 'alert') alert++;

        if (status.classe === 'danger') danger++;
    });

    document.getElementById(
        'statTotal'
    ).textContent = produtos.length;

    document.getElementById(
        'statOk'
    ).textContent = ok;

    document.getElementById(
        'statAlert'
    ).textContent = alert;

    document.getElementById(
        'statDanger'
    ).textContent = danger;
}

function renderizar() {

    atualizarEstatisticas();

    const lista =
        obterProdutosFiltrados();

    if (lista.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">

                <i class="fas fa-box-open"></i>

                <h3>
                    Nenhum produto encontrado
                </h3>

                <p>
                    Adicione ou importe produtos.
                </p>

            </div>
        `;

        return;
    }

    grid.innerHTML = lista.map((p, i) => {

        const status =
            calcularStatus(
                p.validade
            );

        return `
            <div
                class="product-card status-${status.classe}"
                style="animation-delay:${i * 0.05}s"
            >

                <div class="card-header">

                    <div class="card-title">
                        ${p.nome}
                    </div>

                    ${adminLogado ? `
                    <div class="card-actions">

                        <button
                            class="btn-icon btn-edit"
                            onclick="editar(${p.id})"
                        >
                            <i class="fas fa-pen"></i>
                        </button>

                        <button
                            class="btn-icon btn-delete"
                            onclick="deletar(${p.id})"
                        >
                            <i class="fas fa-trash"></i>
                        </button>

                    </div>
                    ` : ''}

                </div>

                <span class="status-badge badge-${status.classe}">
                    <i class="fas ${status.icon}"></i>
                    ${status.texto}
                </span>

                <div class="card-info">

                    <div class="info-item full">

                        <div class="info-label">
                            Localização
                        </div>

                        <div class="info-value">
                            ${p.local}
                        </div>

                    </div>

                    <div class="info-item">

                        <div class="info-label">
                            Estoque
                        </div>

                        <div class="info-value">
                            ${p.qtd}
                        </div>

                    </div>

                    <div class="info-item">

                        <div class="info-label">
                            Validade
                        </div>

                        <div class="info-value">
                            ${formatarData(
                                p.validade
                            )}
                        </div>

                    </div>

                </div>

                <div class="days-counter">

                    <div
                        class="number"
                        style="
                            color:
                            var(--status-${status.classe})
                        "
                    >
                        ${Math.abs(status.dias)}
                    </div>

                    <div class="label">

                        ${
                            status.dias < 0
                            ? 'Dias vencido'
                            : 'Dias restantes'
                        }

                    </div>

                </div>

            </div>
        `;
    }).join('');
}