package pet.house.animal.Contracts;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = false)
public class DeliveryMethodConverter implements AttributeConverter<DeliveryMethod, String> {

    @Override
    public String convertToDatabaseColumn(DeliveryMethod attribute) {
        return attribute == null ? null : attribute.getCode();
    }

    @Override
    public DeliveryMethod convertToEntityAttribute(String dbData) {
        return DeliveryMethod.fromCode(dbData);
    }
}
