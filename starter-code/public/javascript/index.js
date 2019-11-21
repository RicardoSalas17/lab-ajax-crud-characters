const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
	charactersAPI.charactersService;
	document.getElementById('fetch-all').addEventListener('click', async function(event) {
		const { data } = await charactersAPI.getFullList();
		console.log(data);
		data.forEach((character) => {
			const cardInfo = document.createElement('div');
			cardInfo.className = 'character-info';

			const id = document.createElement('div');
			id.className = 'id';
			id.innerText = `Id: ${character.id}`;
			const name = document.createElement('div');
			name.className = 'name';
			name.innerText = `Name: ${character.name}`;
			const occupation = document.createElement('div');
			occupation.className = 'occupation';
			occupation.innerText = `Occupation: ${character.occupation}`;
			const weapon = document.createElement('div');
			weapon.className = 'weapon';
			weapon.innerText = `Weapon: ${character.weapon}`;
			const cartoon = document.createElement('div');
			cartoon.className = 'cartoon';
			cartoon.innerText = `Is a Cartoon?: ${character.cartoon}`;

			cardInfo.appendChild(id);
			cardInfo.appendChild(name);
			cardInfo.appendChild(occupation);
			cardInfo.appendChild(cartoon);
			cardInfo.appendChild(weapon);
			console.log(cardInfo);
			document.querySelector('.characters-container').appendChild(cardInfo);
		});
	});

	document.getElementById('fetch-one').addEventListener('click', async function(event) {
		const characterId = document.querySelector('[name = character-id]').value;
		const { data } = await charactersAPI.getOneRegister(characterId);
		const cardInfo = document.createElement('div');
		cardInfo.className = 'character-info';

		const id = document.createElement('div');
		id.className = 'id';
		id.innerText = `Id: ${data.id}`;
		const name = document.createElement('div');
		name.className = 'name';
		name.innerText = `Name: ${data.name}`;
		const occupation = document.createElement('div');
		occupation.className = 'occupation';
		occupation.innerText = `Occupation: ${data.occupation}`;
		const weapon = document.createElement('div');
		weapon.className = 'weapon';
		weapon.innerText = `Weapon: ${data.weapon}`;
		const cartoon = document.createElement('div');
		cartoon.className = 'cartoon';
		cartoon.innerText = `Is a Cartoon?: ${data.cartoon}`;

		cardInfo.appendChild(id);
		cardInfo.appendChild(name);
		cardInfo.appendChild(occupation);
		cardInfo.appendChild(cartoon);
		cardInfo.appendChild(weapon);
		console.log(cardInfo);
		document.querySelector('.characters-container').appendChild(cardInfo);
	});

	document.getElementById('delete-one').addEventListener('click', async function(event) {
		const id = document.querySelector('[name = character-id-delete]').value;
		const deleted = await charactersAPI.deleteOneRegister(id);
	});



	    // Buscamos el personaje por su id para obtener los valores actuales
		document.querySelector('#buscar-personaje').onclick = () => {
			// obtener el valor del input #characterId

			const id = Number (document.querySelector('#edit-character-form input').value)
			//una vez que obtenemos el id del input buscamos al personaje para obtener los valores previos
			charactersService(`/characters/${id}`)
			  .then(({ data: { name, occupation, weapon, cartoon  } }) => {
				// una vez que la api nos responde con los valores los colocamos como valor dentro de los inputs para editar la información
				
				document.querySelector('#edit-character-form input[name = name]').value = name;
				document.querySelector('#edit-character-form input[name = occupation]').value = occupation;
				document.querySelector('#edit-character-form input[name = weapon]').value = weapon;
				document.querySelector('#edit-character-form input[name = cartoonUpdate]').value = cartoon;
			  })
		  }





	document.getElementById('edit-character-form').addEventListener('submit', async function(event) {

		const id = document.querySelector('#edit-character-form input').value;
		const name = document.querySelector('#edit-character-form input[name = name]').value;
		const occupation = document.querySelector('#edit-character-form input[name = occupation]').value;
		const weapon = document.querySelector('#edit-character-form input[name = weapon]').value;
		const cartoon = document.querySelector('#edit-character-form input[name = cartoonUpdate]').value;

		const update = await charactersAPI.updateOneRegister(id, name, occupation, weapon, cartoon);
	});

	document.getElementById('new-character-form').addEventListener('submit', function(event) {
		const name = document.querySelector('[name = name]').value;
		const occupation = document.querySelector('[name = occupation]').value;
		const weapon = document.querySelector('[name = weapon]').value;
		const cartoon = document.querySelector('[name = cartoonCreate]').value;

		charactersAPI
			.createOneRegister(name, occupation, weapon, cartoon)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	});
});
