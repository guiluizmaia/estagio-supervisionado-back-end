import INumeric from "./INumeric";

class Numeric implements INumeric{
    isFloat(num: number): boolean {
        const x = String(num)

        if(parseInt(x) != parseFloat(x)) {
          return true;
        }
    
        return false;
    }

}
export default Numeric