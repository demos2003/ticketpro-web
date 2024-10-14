interface BadgeProps {
    name: string;
  }
  
  const InitialsBadge: React.FC<BadgeProps> = ({ name }) => {
    // Get initials from the name
    const initials = name.split(' ').map(part => part.charAt(0)).join('').toUpperCase();
  
    // Generate a random color
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  
    return (
      <div style={{
        backgroundColor: randomColor,
        color: 'white',
        borderRadius: 20,
        height:40,
        width:40,
        display: 'flex',
        alignItems:"center",
        justifyContent:"center",
        marginRight: '8px'
      }}>
        {initials}
      </div>
    );
  };

  export default InitialsBadge;