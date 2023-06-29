// import Head from 'next/head'

export default function Contact() {
  return (
    <form className="form-box" action="https://shim.form.newt.so/v1/vUf_6rML6" method="post">
      <div className="form-item">
        <input id="name" placeholder="Name" name="name" autoComplete="name" required />
        <input id="email" name="email" placeholder="Email" type="email" autoComplete="email" required />
        <textarea id="message" name="message" placeholder="Message" required></textarea>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}