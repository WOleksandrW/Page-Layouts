import team from '../data/teamData.js';
import socials from '../data/socialsData.js';

function script() {
  const memberList = document.querySelector('#members-list');

  if (!memberList) return;

  memberList.innerHTML = '';
  memberList.append(...team.map((member) => createTeamMember(member)));
}

function createTeamMember(data) {
  const member = document.createElement('li');
  member.className = 'member';

  const imgBlock = document.createElement('div');
  imgBlock.className = 'member__img-block';

  const image = document.createElement('img');
  image.setAttribute('src', data.image);
  image.setAttribute('alt', data.name);

  const list = createSocialList(data.socials);

  const name = document.createElement('h4');
  name.className = 'member__name';
  name.textContent = data.name;

  const position = document.createElement('p');
  position.className = 'member__position';
  position.textContent = data.position;

  imgBlock.append(image, list);
  member.append(imgBlock, name, position);

  return member;
}

function createSocialList(links) {
  const list = document.createElement('ul');
  list.className = 'social-list member__social-list';

  Object.entries(links).forEach(([social, link]) => {
    const li = document.createElement('li');
  
    const a = document.createElement('a');
    a.className = 'social-link';
    a.setAttribute('href', link);

    const image = document.createElement('img');
    image.setAttribute('src', socials[social]);
    image.setAttribute('alt', social);

    a.append(image);
    li.append(a);
    list.append(li);
  });

  return list;
}

export default script;
