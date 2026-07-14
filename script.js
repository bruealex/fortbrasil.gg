const API_KEY = "a549184f-2a7a-43f3-bad2-d19ca68a7f85";
// 1. CARREGAR LOJA AO ABRIR O SITE
async function carregarLoja() {
    const lojaDiv = document.getElementById("loja");
    try {
        const res = await fetch("https://fortniteapi.io/v2/shop?lang=pt-BR", {
            headers: { "Authorization": API_KEY }
        });
        const data = await res.json();
        lojaDiv.innerHTML = "";

        data.shop.slice(0, 8).forEach(item => {
            lojaDiv.innerHTML += `
                <div class="bg-[#11111a] p-3 rounded-lg card-hover border-purple-900">
                    <img src="${item.item.images.icon}" class="w-full rounded bg-[#1a1a24]">
                    <p class="font-bold mt-2 text-sm">${item.item.name}</p>
                    <p class="text-purple-400 font-bold">${item.finalPrice} V-Bucks</p>
                </div>
            `;
        });
    } catch (error) {
        lojaDiv.innerHTML = "<p class='text-red-400'>Erro ao carregar loja. Verifique sua API Key.</p>";
    }
}

// 2. BUSCAR STATS DO JOGADOR
async function buscarStats() {
    const nick = document.getElementById("playerInput").value;
    const statsDiv = document.getElementById("statsResultado");
    
    if(!nick) return alert("Digite um nick!");

    statsDiv.innerHTML = "<p>Buscando stats...</p>";

    try {
        const res = await fetch(`https://fortniteapi.io/v1/stats?username=${nick}`, {
            headers: { "Authorization": API_KEY }
        });
        const data = await res.json();

        if(data.error) {
            statsDiv.innerHTML = `<p class='text-red-400'>Jogador não encontrado: ${nick}</p>`;
            return;
        }

        statsDiv.innerHTML = `
            <h4 class="text-2xl font-bold mb-4">${data.account.name}</h4>
            <div class="grid grid-cols-3 gap-4 text-center">
                <div class="bg-[#1a1a24] p-3 rounded">
                    <p class="text-gray-400 text-sm">Vitórias</p>
                    <p class="text-3xl font-bold text-purple-400">${data.stats.all.overall.wins || 0}</p>
                </div>
                <div class="bg-[#1a1a24] p-3 rounded">
                    <p class="text-gray-400 text-sm">K/D</p>
                    <p class="text-3xl font-bold text-purple-400">${data.stats.all.overall.kd || 0}</p>
                </div>
                <div class="bg-[#1a1a24] p-3 rounded">
                    <p class="text-gray-400 text-sm">Partidas</p>
                    <p class="text-3xl font-bold text-purple-400">${data.stats.all.overall.matches || 0}</p>
                </div>
            </div>
        `;
    } catch (error) {
        statsDiv.innerHTML = "<p class='text-red-400'>Erro ao buscar stats. Tente novamente.</p>";
    }
}

carregarLoja(); // roda quando abre o site
