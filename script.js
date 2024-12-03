let speciesData = [];
fetch('species_data.json')
.then(response => response.json())
.then(data => {
speciesData = data;
});
function displaySpecies(data) {
const speciesList = document.getElementById('species-list');
speciesList.innerHTML = data.map(species => ` <div>
    <img class="resized" src="${species.image_url}" alt="${species.common_name}">
<h3>${species.common_name} (${species.scientific_name})</h3>
<p>Habitat: ${species.habitat}</p>
<p>Status: ${species.conservation_status}</p>
<div>
<h4>Classification:</h4>
<ul>
<li><strong>Kingdom:</strong> ${species.classification.kingdom}</li>
<li><strong>Phylum:</strong> ${species.classification.phylum}</li>
<li><strong>Class:</strong> ${species.classification.class}</li>
<li><strong>Order:</strong> ${species.classification.order}</li>
<li><strong>Family:</strong> ${species.classification.family}</li>
<li><strong>Genus:</strong> ${species.classification.genus}</li>
<li><strong>Species:</strong> ${species.classification.species}</li>
</ul>
</div>

</div>
`).join('');
}
// Add event listener for Enter key
document.getElementById('search-input').addEventListener('keypress', function (event) {
if (event.key === 'Enter') { // Check if the Enter key is pressed
event.preventDefault(); // Prevent the default form submission behavior
searchSpecies();
}
});
function searchSpecies() {
const searchTerm = document.getElementById('search-input').value.toLowerCase();
const filteredData = speciesData.filter(species => species.common_name.toLowerCase().includes(searchTerm) ||
species.scientific_name.toLowerCase().includes(searchTerm)
);
// Display filtered results or a message if no results are found
if (filteredData.length > 0) {
displaySpecies(filteredData);
} else {
const speciesList = document.getElementById('species-list');
speciesList.innerHTML = `<p>No species found matching "${searchTerm}". Please try again.</p>`;
}
}