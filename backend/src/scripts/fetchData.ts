import axios, { AxiosResponse } from 'axios';
import Monster from '../graphql/model/Monsters.ts';
import Race from '../graphql/model/Race.ts';
import Class from '../graphql/model/Class.ts';
import AbilityScore from '../graphql/model/AbilityScore.ts';

import Equipment from '../graphql/model/Equipment.js';

const imageBaseURL = 'https://www.dnd5eapi.co/api/images/monsters';

const urls = {
  monsters: 'https://www.dnd5eapi.co/api/monsters',
  races: 'https://www.dnd5eapi.co/api/races',
  classes: 'https://www.dnd5eapi.co/api/classes',
  equipments: 'https://www.dnd5eapi.co/api/equipment',
  abilities: 'https://www.dnd5eapi.co/api/ability-scores',
};

async function fetchMonsters() {
  const { data } = await axios.get(urls.monsters);
  const monsters = data.results;

  for (const monster of monsters) {
    const monsterDetails = await axios.get(`${urls.monsters}/${monster.index}`);
    const inDB = await Monster.findOne({ name: monsterDetails.data.name });

    if (!inDB && monsterDetails.data.image) {
      const imageUrl = `${imageBaseURL}/${monsterDetails.data.index}.png`;
      await new Monster({
        name: monsterDetails.data.name,
        size: monsterDetails.data.size,
        type: monsterDetails.data.type,
        alignment: monsterDetails.data.alignment,
        hit_points: monsterDetails.data.hit_points,
        image: imageUrl,
      }).save();
      console.log(`Monster saved: ${monsterDetails.data.name}`);
    } else if (!monsterDetails.data.image) {
      console.warn(`Skipping monster ${monsterDetails.data.name} - no image available`);
    }
  }
  console.log('All monsters saved to MongoDB!');
}

async function fetchRaces() {
  const { data } = await axios.get(urls.races);
  const races = data.results;

  for (const race of races) {
    const raceDetails = await axios.get(`${urls.races}/${race.index}`);
    const inDB = await Race.findOne({ index: raceDetails.data.index });

    if (!inDB) {
      await new Race({
        index: raceDetails.data.index,
        name: raceDetails.data.name,
        size: raceDetails.data.size,
        size_description: raceDetails.data.size_description,
        alignment: raceDetails.data.alignment,
        speed: raceDetails.data.speed,
      }).save();
      console.log(`Race saved: ${raceDetails.data.name}`);
    }
  }
  console.log('All races saved to MongoDB!');
}

async function fetchClasses() {
  const { data } = await axios.get(urls.classes);
  const classes = data.results;

  for (const classData of classes) {
    const classDetails = await axios.get(`${urls.classes}/${classData.index}`);
    const inDB = await Class.findOne({ index: classDetails.data.index });

    if (!inDB) {
      const proficiencyChoices = classDetails.data.proficiency_choices?.find(
        (choice: any) => choice.type === 'proficiencies',
      );

      const skills = proficiencyChoices
        ? proficiencyChoices.from.options.map((option: any) => option.item.name.replace('Skill: ', ''))
        : [];

      await new Class({
        index: classDetails.data.index,
        name: classDetails.data.name,
        hit_die: classDetails.data.hit_die,
        skills: skills,
      }).save();
      console.log(`Class saved: ${classDetails.data.name}`);
    }
  }
  console.log('All classes saved to MongoDB!');
}

async function fetchAbilityScores() {
  try {
    const { data } = await axios.get(urls.abilities);
    const abilities = data.results;


    for (const ability of abilities) {
      const abilityDetails = await axios.get(`${urls.abilities}/${ability.index}`);
      const inDB = await AbilityScore.findOne({ index: abilityDetails.data.index });




      if (!inDB) {
        const skillNames = abilityDetails.data.skills.map((skill : any) => skill.name);
        const abilityDocument = new AbilityScore({
          index: abilityDetails.data.index,
          name: abilityDetails.data.name,
          //desc: Array.isArray(abilityDetails.data.desc) ? abilityDetails.data.desc : [],
          skills: skillNames
        });

        await abilityDocument.save();
        console.log(`ability saved: ${skillNames}`);


      }

    }

    console.log('All abilities saved to MongoDB!');
  } catch (error) {
    console.error('Error fetching or saving abilities:', error);
  }
}

async function fetchEquipments() {
  const { data } = await axios.get(urls.equipments);
  const equipments = data.results;

  for (const equipment of equipments) {
    const equipmentDetails = await axios.get(`${urls.equipments}/${equipment.index}`);
    const inDB = await Equipment.exists({ index: equipmentDetails.data.index });

    if (!inDB) {
      await new Equipment({
        index: equipmentDetails.data.index,
        name: equipmentDetails.data.name,
        category: equipmentDetails.data.equipment_category.name,
        value: equipmentDetails.data.cost.quantity,
      }).save();
      console.log(`Equipment saved: ${equipmentDetails.data.name}`);
    }
  }
  console.log('All equipments saved to MongoDB!');
}

async function fetchData() {
  try {
    await fetchMonsters();
    await fetchRaces();
    await fetchClasses();
    await fetchAbilityScores();
    await fetchEquipments();
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
}

export default fetchData;
