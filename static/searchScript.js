document.addEventListener("DOMContentLoaded", () => {
    const cityDropdown = document.getElementById("city");
    const sportDropdown = document.getElementById("sport");
    const centersContainer = document.getElementById("centers");

    // Fetch data from the server
    fetch("/centers")
        .then(response => response.json())
        .then(data => {
            renderCenters(data);

            cityDropdown.addEventListener("change", () => filterCenters(data));
            sportDropdown.addEventListener("change", () => filterCenters(data));
        });

    function renderCenters(centers) {
        if (centers.length === 0) {
            centersContainer.innerHTML = `
                <div class="text-center col-span-full text-gray-700 text-lg font-bold">
                    Ooops! No centers for this
                </div>
            `;
            return;
        }

        centersContainer.innerHTML = centers.map(center => `
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h3 class="text-xl font-bold mb-2">${center.name}</h3>
                <p class="text-gray-700">Address: ${center.address}</p>
                <p class="text-gray-700">Contact: ${center.contact}</p>
                <p class="text-gray-700">Sports: ${center.sports.join(", ")}</p>
            </div>
        `).join("");
    }

    function filterCenters(centers) {
        const selectedCity = cityDropdown.value.toLowerCase();
        const selectedSport = sportDropdown.value.toLowerCase();

        const filtered = centers.filter(center => {
            const cityMatch = !selectedCity || center.address.toLowerCase().includes(selectedCity);
            const sportMatch = !selectedSport || center.sports.some(sport => sport.toLowerCase().includes(selectedSport));
            return cityMatch && sportMatch;
        });

        renderCenters(filtered);
    }
});
