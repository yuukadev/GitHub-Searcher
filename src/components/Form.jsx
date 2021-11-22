import React, { useState, useEffect } from "react";

function Form() {
  const handleNull = (param1) => {
    if (param1 === "" || param1 === null) {
      return "None";
    } else {
      return `${param1}`;
    }
  };
  const [base, setBase] = useState({
    name: "",
    login: "",
    bio: "",
    company: "",
    location: "",
    website: "",
    email: "",
    followers: 0,
    following: 0,
    twitter: "",
    repos: 0,
  });
  const [img, setImg] = useState();
  const getUser = async (username) => {
    try {
      const url = await fetch(`https://api.github.com/users/${username}`);
      const random = await url.json();
      setBase({
        name: `${handleNull(random.name, base.name)}`,
        login: `@${random.login}`,
        bio: ` ${random.bio}`,
        company: ` ${handleNull(random.company, base.company)}`,
        location: ` ${handleNull(random.location, base.location)}`,
        website: ` ${random.blog}`,
        email: ` ${handleNull(random.email, base.email)}`,
        followers: `${random.followers}`,
        following: `${random.following}`,
        twitter: ` ${random.twitter_username}`,
        repos: `${random.public_repos}`,
      });
      setImg(random.avatar_url);
      console.log(random);
    } catch {
      alert("There was something wrong");
    }
  };
  useEffect(() => {
    getUser("YuukaDev");
  }, []);
  return (
    <div className="container-fluid">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.elements.usernameInput.value;
          if (!username) {
            return alert("Please enter username");
          } else {
            getUser(username);
          }
        }}
      >
        <div className="flex">
          <input
            type="text"
            id="usernameInput"
            placeholder="Enter a username..."
          />
        </div>
        <div className="card ">
          <div className="data-container">
            <div className="data-header">
              <img className="m-3 rounded-circle" src={img} alt="logo" />
              <div className="profile-name">
                <p>{base.name}</p>
                <p>{base.login}</p>
                <p>{base.bio}</p>
                <p>
                  <i className="fas fa-envelope"></i>
                  {base.email}
                </p>
              </div>
            </div>
            <div className="profile-stats-container">
              <div className="profile-stat">
                <p>Repos</p>
                <p>{base.repos}</p>
              </div>
              <div className="profile-stat">
                <p>Followers</p>
                <p>{base.followers}</p>
              </div>
              <div className="profile-stat">
                <p>Following</p>
                <p>{base.following}</p>
              </div>
            </div>
            <div className="container">
              <div className="row row-cols-2">
                <p className="col">
                  <i className="fas fa-map-marker-alt"></i>
                  {base.location}
                </p>
                <p className="col">
                  <i className="fab fa-twitter"></i>
                  {base.twitter}
                </p>
                <p className="col">
                  <i className="fas fa-link"></i>
                  {base.website}
                </p>
                <p className="col">
                  <i className="fas fa-building"></i>
                  {base.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
