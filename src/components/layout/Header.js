// rafc
import {Box, SafeAreaView, StatusBar, Text } from '@gluestack-ui/themed'

export const Header = () => {
  return (
    <SafeAreaView>
        <StatusBar/>
        <Box bg='#2c3e50' alignItem='center' justifyContent ='center' safeAreaTop py={10}> 
            <Text color='#fff' fontSize={20} fontWeight='bold' alignSelf='center'>Movie App</Text>
        </Box>
    </SafeAreaView>
  )
}

export default Header