import styled from "styled-components";

const Contact = () => {
  return (
    <Wrapper>
      <h2>Contact Page</h2>
      {/* Map Integration */}
      <iframe
      title="hello"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14742.620724910725!2d88.34591444721413!3d22.517116972496975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027781aba713e5%3A0xf8f1cead924ae1a4!2sLake%20Mall!5e0!3m2!1sen!2sin!4v1686888216230!5m2!1sen!2sin"
        width="100%"
        height="500"
        style={{border:'0'}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Form Section */}
      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/xgebgzoj" method="post" className="contact-inputs">
            <input type="text" 
              placeholder="Username"
              name="username"
              required
              autoComplete="off"
            />
            <input type="email"
              placeholder="Email"
              name="email"
              required
              autoComplete="off"
            />
            <textarea
              placeholder="Enter Your Massage"
              name="massage"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              ></textarea>
            <input type="submit" value="send" />
          </form>
        </div>
      </div>

    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;

export default Contact;
