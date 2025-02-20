import { Box, Button, Text } from "@gluestack-ui/themed";

const HeaderDetails = ({ title, onBack }) => {
  return (
    <Box bg="white" flexDirection="row" alignItems="center"  py={10} >
      <Button bg="transparent" onPress={onBack} >
        <Text color="#3498db">← Back to List</Text>
      </Button>
      <Text fontSize={16} fontWeight="bold">{title}</Text>
      <Box width={50} /> 
    </Box>
  );
};

export default HeaderDetails;
