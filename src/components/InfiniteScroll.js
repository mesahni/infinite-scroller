import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import request from "superagent";
import debounce from "lodash.debounce";

class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: [],
    };

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadUsers,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadUsers();
      }
    }, 100);
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadUsers();
  }


componentDidUpdate(prevProps) {
  if(this.props.data !== prevProps.data) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
  {
    this.loadUsers();
  }
}

  loadUsers = () => {
  const { data } = this.props;
  console.log(data);
    this.setState({ isLoading: true }, () => {
      fetch('http://shibe.online/api/' + data + '?count=[1-10]&urls=[true/false]&httpsUrls=[true/false]', {
        method: 'GET',
        mode: 'no-cors'
      })
        .then((results) => {
        console.log("results");
        console.log(results);
          // Creates a massaged array of user data


        const nextUsers = results.body.results.map(user => ({
            photo: user.picture.medium
        }))

          // Merges the next users into our existing users
          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: (this.state.users.length < 100),
            isLoading: false,
            users: [
              ...this.state.users,
              ...nextUsers,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      users,
    } = this.state;

    return (
      <div>
        <p>Scroll down to load more!!</p>
        {users.map(user => (
          <Fragment key={user.username}>
            <hr />
            <div style={{ display: 'flex' }}>
              <img
                src={user.photo}
                style={{
                  borderRadius: '50%',
                  height: 72,
                  marginRight: 20,
                  width: 72,
                }}
              />
            </div>
          </Fragment>
        ))}
        <hr />
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>Loading...</div>
        }
        {!hasMore &&
          <div>You did it! You reached the end!</div>
        }
      </div>
    );
  }
}

export default InfiniteScroll;
