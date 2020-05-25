import { withApollo } from '../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_LOGS, CREATE_LOG } from '../lib/schemas'
import { useForm } from '../lib/useForm'
import React from 'react';

const Index = () => {
  const { loading, data, error, refetch } = useQuery(GET_LOGS)
  const [createLog, { }] = useMutation(CREATE_LOG)
  const [values, setValues] = useForm({ name: "", msg: "" })

  const handleLogAdd = e => {
    e.preventDefault()
    const { name, msg } = values
    if (values.name && values.msg) {
      createLog({ variables: { name, msg } })
        .then(() => {
          console.log("mutation success")
          refetch()
        }
        )
        .catch(err => console.log("mutation failure", err.message))
    }
  }
  let DataComponent
  if (data && data.logs) {
    // console.log(data)
  }
  return (
    <div className="container">
      <h1>Logs</h1>
      <form onSubmit={handleLogAdd}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="nameId" onChange={setValues} />
        <label htmlFor="msg">Log:</label>
        <input type="text" name="msg" id="msgId" onChange={setValues} />
        <button type="submit">Add</button>
      </form>
      <div className="data">
        {data && data.logs && data.logs.map(log => <p key={log.id}>{log.name}: {log.msg}</p>)}
      </div>
      <style jsx global>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          outline: none;
        }

        body {
          background: black;
        }
        h1 {
          color: white;
          margin-bottom: 1.5rem;
        }

        .container {
          width: 95%;
          padding: 1rem;
          max-width: 480px;
          margin: 0 auto;
          height: 100vh;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
        }

        form {
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: start;
          width: 100%;
        }
        form label, form input {
          margin-bottom: 1rem;
          width: 100%;
        }

        form label {
          color: white;
        }

        form input {
          padding: 0.5rem 1rem;
          border-radius: 5px;
          background: #fefefe;
          border: 1px solid #f2f2f2;
        }
        form input:hover, form input:focus {
          border: 1px solid #fff;
        }

        form button {
          border-radius: 5px;
          margin-bottom: 1rem;
          width: 100%;
          background: rgb(30 105 255);
          color: white;
          text-transform: uppercase;
          font-weight: bold;
          padding: 0.5rem 1rem;
          border: none;
          cursor: pointer;
        }
        
        form button:hover, form button:focus {
          background: rgb(56 122 255);
        }
        
        .data {
          width: 100%;
          overflow-y: auto;
          flex-grow: 1;
        }

        .data p {
          margin-bottom: 0.5rem;
          color: #f2f2f2;
          border: 1px solid white;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          word-break: break-word;
        }

      `}
      </style>
    </div>
  )
}

export default withApollo({ ssr: true })(Index)