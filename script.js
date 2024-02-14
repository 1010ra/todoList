
//
const inputCategorie = document.getElementById('inputCategorie');
const inputTitre = document.getElementById('inputTitre');
const inputDate = document.getElementById('inputDate');
const inputDescription = document.getElementById('inputDescription');
const inputStatut = document.getElementById('inputStatut');
const btnAjouter = document.getElementById('btnAjouter');
const erreur = document.getElementById("erreur");
const inputHistorique = document.getElementById('inputHistorique');
const tbody = document.querySelector('.tbody');
const trTableCacher = document.getElementById('trTableCacher');
const divTableCacher = document.getElementById('divTableCacher');
const divDnotification = document.getElementById("divDnotification");
const titreDnotification = document.getElementById("titreDnotification");
const paragrapDnotification = document.getElementById("paragrapDnotification");


let tabExpense = JSON.parse(localStorage.getItem('tabExpense')) || [];

// Initialisation des variables dans locales
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let titres = JSON.parse(localStorage.getItem('titres')) || [];
let dates = JSON.parse(localStorage.getItem('dates')) || [];
let descriptions = JSON.parse(localStorage.getItem('descriptions')) || [];
let statuts = JSON.parse(localStorage.getItem('statuts')) || [];
let numbreNouveau = JSON.parse(localStorage.getItem('numbreNouveau')) || 0;
let numbreEnCours = JSON.parse(localStorage.getItem('numbreEnCours')) || 0;
let numbreTerminer = JSON.parse(localStorage.getItem('numbreTerminer')) || 0;

// console.log(numbreNouveau,numbreEnCours,numbreTerminer);

function updateDatasChart() {
  localStorage.setItem('numbreNouveau', JSON.stringify(numbreNouveau))
  localStorage.setItem('numbreEnCours', JSON.stringify(numbreEnCours))
  localStorage.setItem('numbreTerminer', JSON.stringify(numbreTerminer))
}

// Mettre à jour le tableau d'expenses
function updateTabExpense() {
  tabExpense = categories.map((category, index) => ({
    category,
    titre: titres[index],
    date: dates[index],
    description: descriptions[index],
    statut: statuts[index]
  }));
  localStorage.setItem('tabExpense', JSON.stringify(tabExpense));
}

// Afficher la liste des tâches
function displayTache() {
  tbody.innerHTML = "";
  tabExpense.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.classList.add('table-row');
    row.innerHTML += `
      <td>${index + 1}</td>
      <td>${expense.date}</td>
      <td onclick="clickTitre(${index})">${expense.titre}</td>
      <td>${expense.category}</td>
      <td>
        <i class="bi bi-eye  " onclick="displayInformation(${index})"></i>
        <i class="bi bi-pencil mx-2" onclick="editTache(${index})"></i>
        <i class="bi bi-trash3-fill " onclick="deleteTache(${index})"></i>
      </td>
    `;
    // Ajout des classes spécifiques aux icônes
    const icons = row.querySelectorAll('i');
    icons.forEach((icon) => {
      icon.classList.add('icon-common');
      if (icon.classList.contains('bi-eye')) {
        icon.classList.add('icon-eye');
      } else if (icon.classList.contains('bi-pencil')) {
        icon.classList.add('icon-pencil');
      } else if (icon.classList.contains('bi-trash3-fill')) {
        icon.classList.add('icon-trash');
      }
    });
    tbody.appendChild(row);

    row.addEventListener('click', function () {
      // inputHistorique.value = expense.description

    })

  });
}

function clickTitre(index) {
  let tache = tabExpense[index]
  // console.log(tache);
  inputHistorique.value = tache.description;

}

// Afficher la description
function displayInformation(index) {
  divTableCacher.classList.toggle('d-none')
  let tache = tabExpense[index];
  console.log(tache);
  trTableCacher.innerHTML = "";
  trTableCacher.innerHTML = `<tr>
          <th>Categorie</th>  
          <td class="p-2">${tache.category}</td>
        </tr>
        <tr>
          <th>Titre</th>
          <td class="p-2">${tache.titre}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td class="p-2">${tache.date}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td class="p-2">${tache.description}</td>
        </tr>
        <tr>
          <th>Statut</th>
          <td class="p-2">${tache.statut}</td>
        </tr>`
}

// Ajouter une tâche
btnAjouter.addEventListener('click', () => {
  if (!inputCategorie.value || !inputTitre.value || !inputDate.value || !inputStatut.value) {
    erreur.classList.remove('d-none');
  } else {
    erreur.classList.add('d-none');

    categories.push(inputCategorie.value);
    titres.push(inputTitre.value);
    dates.push(inputDate.value);
    descriptions.push(inputDescription.value);
    statuts.push(inputStatut.value);
    console.log(inputStatut.value);
    if (inputStatut.value === 'Nouveau') {
      numbreNouveau++;
      updateDatasChart()
    } else if (inputStatut.value === 'En-cours') {
      numbreEnCours++;
      updateDatasChart()
    } else if (inputStatut.value === 'Terminer') {
      numbreTerminer++;
      updateDatasChart()
    }


    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('titres', JSON.stringify(titres));
    localStorage.setItem('dates', JSON.stringify(dates));
    localStorage.setItem('descriptions', JSON.stringify(descriptions));
    localStorage.setItem('statuts', JSON.stringify(statuts));


    updateTabExpense();
    displayTache();

    let titreN = 'Ajout de tache'
    let descriptionN = 'Enregistrement effectue avec succes'
    notification(titreN, descriptionN)

    inputCategorie.value = "";
    inputTitre.value = "";
    inputDate.value = "";
    inputDescription.value = "";
    inputStatut.value = "";
  }
});

// Supprimer une tâche
function deleteTache(index) {
  categories.splice(index, 1);
  titres.splice(index, 1);
  dates.splice(index, 1);
  descriptions.splice(index, 1);
  statuts.splice(index, 1);

  localStorage.setItem('categories', JSON.stringify(categories));
  localStorage.setItem('titres', JSON.stringify(titres));
  localStorage.setItem('dates', JSON.stringify(dates));
  localStorage.setItem('descriptions', JSON.stringify(descriptions));
  localStorage.setItem('statuts', JSON.stringify(statuts));

  updateTabExpense();
  displayTache();
//=================================pour Suppression de tâche
  let titreN = 'Suppression de tâche'
  let descriptionN = 'tâche supprimée avec succès '
  notification(titreN, descriptionN)

  inputCategorie.value = "";
  inputTitre.value = "";
  inputDate.value = "";
  inputDescription.value = "";
  inputStatut.value = "";
}

// recuperer tâche à editer
let modifierTache = "";
function editTache(index) {
  modifierTache = tabExpense[index]
  console.log('modifierTache', modifierTache);

  inputCategorie.value = modifierTache.category;
  inputTitre.value = modifierTache.titre;
  inputDate.value = modifierTache.date;
  inputDescription.value = modifierTache.description;
  inputStatut.value = modifierTache.statut;
  btnAjouter.classList.add("d-none");
  btnModifier.classList.remove('d-none')



}


// Éditer une tâche
function modifierBtn() {
  let indexModifier = tabExpense.indexOf(modifierTache);
  console.log(indexModifier);
  modifierTache.category = inputCategorie.value;
  modifierTache.titre = inputTitre.value;
  modifierTache.date = inputDate.value;
  modifierTache.description = inputDescription.value;
  modifierTache.statut = inputStatut.value;

  categories[indexModifier] = inputCategorie.value;
  titres[indexModifier] = inputTitre.value;
  dates[indexModifier] = inputDate.value;
  descriptions[indexModifier] = inputDescription.value;
  statuts[indexModifier] = inputStatut.value;

  localStorage.setItem('categories', JSON.stringify(categories));
  localStorage.setItem('titres', JSON.stringify(titres));
  localStorage.setItem('dates', JSON.stringify(dates));
  localStorage.setItem('descriptions', JSON.stringify(descriptions));
  localStorage.setItem('statuts', JSON.stringify(statuts));

  updateTabExpense();
  displayTache();
//=================================pour nouvelle mise a jour des taches
  let titreN = 'Mise à jours de tâche'
  let descriptionN = 'Mise à jours  avec succès '
  notification(titreN, descriptionN)

};
//======================================pour les notification
function notification(titre, description) {
  divDnotification.classList.remove('d-none');
  titreDnotification.innerText = titre;
  paragrapDnotification.innerText = description;

  setTimeout(() => {
    divDnotification.classList.add('d-none');
  }, 4000);

}

// Initialisation
updateTabExpense();
displayTache();

// -----------------------------------------chart
const ctx = document.getElementById('myChart');

function showChart() {
  let config = {
    type: 'pie',
    data: {
      labels: ['Nouveau', 'En cours', 'Terminé'],
      datasets: [{
        // label: '# of Votes',
        data: [numbreNouveau, numbreEnCours, numbreTerminer], //[2, 5, 3],
        borderWidth: 0
      }]
    },
    options: {
      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
          display: false,
        }
      }
    }
  };

  let graphe = new Chart(ctx, config);
  return graphe;

}
// =================== APPEL DE LA FONCTION SHOWSART ================
showChart();